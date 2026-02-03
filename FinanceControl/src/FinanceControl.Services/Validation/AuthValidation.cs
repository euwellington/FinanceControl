using FinanceControl.Models.Entities;
using FluentValidation;

namespace FinanceControl.Services.Validation;

public class AuthValidation : AbstractValidator<Auth>
{
    public AuthValidation()
    {
        RuleFor(x => x)
            .Custom((auth, context) =>
            {
                if (string.IsNullOrWhiteSpace(auth.Email) || string.IsNullOrWhiteSpace(auth.Password))
                {
                    context.AddFailure("Email ou senha são obrigatórios");
                }
            });
    }
}
