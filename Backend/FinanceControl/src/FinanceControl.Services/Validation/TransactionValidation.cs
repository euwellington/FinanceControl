using FinanceControl.Models.Entities;
using FinanceControl.Models.Enums;
using FinanceControl.Repositories.Interfaces;
using FluentValidation;
using System.Threading.Tasks;

namespace FinanceControl.Services.Validation;

public class TransactionValidation : AbstractValidator<Transaction>
{
    public TransactionValidation(IPeopleRepository peopleRepository, ICategoryRepository categoryRepository, bool isUpdate = false)
    {
        if (isUpdate)
        {
            RuleFor(t => t.Id)
                .NotEmpty()
                .WithMessage("O Id deve ser informado para atualização.");
        }

        RuleFor(t => t.Description)
            .NotEmpty()
            .WithMessage("A descrição é obrigatória.")
            .MaximumLength(400)
            .WithMessage("A descrição não pode ter mais de 400 caracteres.");

        RuleFor(t => t.Amount)
            .GreaterThan(0)
            .WithMessage("O valor deve ser maior que zero.");

        RuleFor(t => t.Type)
            .IsInEnum()
            .WithMessage("O tipo da transação é inválido.");

        RuleFor(t => t.PersonId)
            .NotEmpty()
            .WithMessage("O Id da pessoa é obrigatório.")
            .MustAsync(async (personId, cancellation) =>
            {
                var person = await peopleRepository.GetById(personId);
                if (person == null) return false;
                return true;
            })
            .WithMessage("Pessoa não encontrada.");

        RuleFor(t => t.CategoryId)
            .NotEmpty()
            .WithMessage("O Id da categoria é obrigatório.")
            .MustAsync(async (transaction, categoryId, cancellation) =>
            {
                var category = await categoryRepository.GetById(categoryId);
                if (category == null) return false;

                var person = await peopleRepository.GetById(transaction.PersonId);
                if (person == null) return false;

                // Menores de 18 só podem despesas
                if (person.Age < 18 && transaction.Type != TransactionType.Expense)
                    return false;

                // Verifica compatibilidade tipo x finalidade
                if ((transaction.Type == TransactionType.Expense && category.Purpose == CategoryPurpose.Income) ||
                    (transaction.Type == TransactionType.Income && category.Purpose == CategoryPurpose.Expense))
                    return false;

                return true;
            })
            .WithMessage("Transação inválida: menor de idade só pode despesas ou tipo incompatível com a categoria.");
    }
}
