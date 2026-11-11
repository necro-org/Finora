using Contracts.Repositories;
using Domain.Exceptions;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Base;

public class ServiceHandlerDecorator<TRequest, TResponse> : IServiceHandler<TRequest, TResponse>
{
    private readonly IServiceHandler<TRequest, TResponse> _inner;
    private readonly IValidator<TRequest>? _validator;
    private readonly IUnitOfWork _unitOfWork;

    public ServiceHandlerDecorator(
        IServiceHandler<TRequest, TResponse> inner,
        IServiceProvider provider,
        IUnitOfWork unitOfWork)
    {
        _inner = inner;
        _validator = provider.GetService<IValidator<TRequest>>();
        _unitOfWork = unitOfWork;
    }

    public async Task<TResponse> Handle(TRequest request)
    {
        await Validate(request);

        var response = await _inner.Handle(request);

        await _unitOfWork.SaveChanges();

        return response;
    }

    private async Task Validate(TRequest request)
    {
        if (_validator is null)
        {
            return;
        }

        var validationResult = await _validator.ValidateAsync(request);

        if (validationResult.IsValid)
        {
            return;
        }

        var errors = validationResult.Errors
            .Select(validationFailure => $"Propriedade: {validationFailure.PropertyName} - Erro: {validationFailure.ErrorMessage}")
            .ToList();

        var message = string.Join(Environment.NewLine, errors);

        throw new BadRequestException(message);
    }
}
