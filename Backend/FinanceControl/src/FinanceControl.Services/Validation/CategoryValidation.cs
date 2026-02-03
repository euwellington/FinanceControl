using FinanceControl.Models.Entities;
using FluentValidation;

namespace FinanceControl.Services.Validation;

public class CategoryValidation : AbstractValidator<Category>
{
    public CategoryValidation(bool isUpdate = false)
    {
        if (isUpdate)
        {
            RuleFor(c => c.Id)
                .NotEmpty()
                .WithMessage("O Id deve ser informado para atualização.");
        }

        RuleFor(c => c.Description)
            .NotEmpty()
            .WithMessage("A descrição é obrigatória.")
            .MaximumLength(400)
            .WithMessage("A descrição não pode ter mais de 400 caracteres.");

        RuleFor(c => c.Purpose)
            .IsInEnum()
            .WithMessage("O propósito informado é inválido. Deve ser Expense, Income ou Both.");
    }
}
