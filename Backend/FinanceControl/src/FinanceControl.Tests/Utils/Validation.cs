using System;
using System.Text.RegularExpressions;

namespace FinanceControl.Tests.Utils
{
    public static class Validation
    {
        // Valida se o email está no formato correto
        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email)) return false;
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        // Valida se o CNPJ está no formato correto (apenas regex básica)
        public static bool IsValidCnpj(string cnpj)
        {
            if (string.IsNullOrWhiteSpace(cnpj)) return false;
            var regex = new Regex(@"^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$");
            return regex.IsMatch(cnpj);
        }

        // Valida se o CPF está no formato correto (apenas regex básica)
        public static bool IsValidCpf(string cpf)
        {
            if (string.IsNullOrWhiteSpace(cpf)) return false;
            var regex = new Regex(@"^\d{3}\.\d{3}\.\d{3}-\d{2}$");
            return regex.IsMatch(cpf);
        }

        // Valida se o telefone está no formato (XX)XXXXX-XXXX ou (XX)XXXX-XXXX
        public static bool IsValidPhone(string phone)
        {
            if (string.IsNullOrWhiteSpace(phone)) return false;
            var regex = new Regex(@"^\(\d{2}\)\d{4,5}-\d{4}$");
            return regex.IsMatch(phone);
        }

        // Valida se o número é positivo
        public static bool IsPositive(int number)
        {
            return number > 0;
        }

        // Valida se a string não é nula ou vazia
        public static bool IsNotNullOrEmpty(string value)
        {
            return !string.IsNullOrWhiteSpace(value);
        }

        // Valida se a data não é futura
        public static bool IsNotFutureDate(DateTime date)
        {
            return date <= DateTime.Now;
        }

        // Valida se a string contém apenas letras e espaços
        public static bool IsOnlyLetters(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return false;
            var regex = new Regex(@"^[A-Za-zÀ-ÿ\s]+$");
            return regex.IsMatch(value);
        }
    }
}