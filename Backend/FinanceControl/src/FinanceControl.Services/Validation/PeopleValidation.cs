using FinanceControl.Models.Entities;
using FinanceControl.Repositories.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Components.Forms;
using System.Threading;
using System.Threading.Tasks;

namespace FinanceControl.Services.Validation;

public class PeopleValidation : AbstractValidator<People>
{
    public PeopleValidation(IPeopleRepository peopleRepository, bool isUpdate = false)
    {
        if (isUpdate)
        {
            RuleFor(p => p.Id)
                .NotEmpty()
                .WithMessage("O Id deve ser informado para atualização.");
        }

        RuleFor(p => p.Name)
            .NotEmpty()
            .WithMessage("O nome é obrigatório.")
            .MaximumLength(200)
            .WithMessage("O nome não pode ter mais de 200 caracteres.");

        RuleFor(p => p.Age)
            .GreaterThanOrEqualTo(0)
            .WithMessage("A idade deve ser zero ou maior.");

        RuleFor(p => p.Email)
            .NotEmpty()
            .WithMessage("O email é obrigatório.")
            .MaximumLength(100)
            .WithMessage("O email não pode ter mais de 100 caracteres.")
            .Matches(@"^[^@\s]+@[^@\s]+\.[^@\s]+$")
            .WithMessage("O email informado não é válido");

        RuleFor(p => p.Email)
        .Must(email => !peopleRepository.AlreadyEmail(email)).WithMessage("Email já cadastrado");

        if (!isUpdate)
        {
            RuleFor(p => p.Password)
                .NotEmpty()
                .WithMessage("A senha é obrigatória.")
                .MaximumLength(100)
                .WithMessage("A senha não pode ter mais de 100 caracteres.");
        }
    }
}
