using AutoMapper;
using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using FinanceControl.WebAPI.RequestResponse;
using Microsoft.AspNetCore.Identity.Data;
using MySqlX.XDevAPI;
using System.Diagnostics.Contracts;

namespace FinanceControl.WebAPI.AutoMapper;

public class AutoMapperConfig : Profile
{

    public AutoMapperConfig()
    {
        // Conversões globais de string para Guid
        CreateMap<string, Guid>().ConvertUsing(s => string.IsNullOrWhiteSpace(s) ? Guid.Empty : Guid.Parse(s));
        CreateMap<string, Guid?>().ConvertUsing(s => string.IsNullOrWhiteSpace(s) ? null : Guid.Parse(s));

        // Conversões globais de string para int
        CreateMap<string, int>().ConvertUsing(s => string.IsNullOrWhiteSpace(s) ? 0 : int.Parse(s));
        CreateMap<string, int?>().ConvertUsing(s => string.IsNullOrWhiteSpace(s) ? null : int.Parse(s));

        // Conversões globais de string para decimal
        CreateMap<string, decimal>().ConvertUsing(s => string.IsNullOrWhiteSpace(s) ? 0m : decimal.Parse(s));
        CreateMap<string, decimal?>().ConvertUsing(s => string.IsNullOrWhiteSpace(s) ? null : decimal.Parse(s));

        // Conversões globais de string para bool
        CreateMap<string, bool>().ConvertUsing(s => !string.IsNullOrWhiteSpace(s) && bool.Parse(s));
        CreateMap<string, bool?>().ConvertUsing(s => string.IsNullOrWhiteSpace(s) ? null : bool.Parse(s));

        #region People
        CreateMap<PeopleRequest, People>();
        CreateMap<PeopleUpdateRequest, People>();
        CreateMap<People, PeopleResponse>();
        CreateMap<PeopleModel, PeopleResponse>();
        #endregion

        #region Category
        CreateMap<CategoryRequest, Category>();
        CreateMap<CategoryUpdateRequest, Category>();
        CreateMap<Category, CategoryResponse>();
        CreateMap<CategoryModel, CategoryResponse>();
        #endregion

        #region Transaction
        CreateMap<TransactionRequest, Transaction>();
        CreateMap<TransactionUpdateRequest, Transaction>();
        CreateMap<Transaction, TransactionResponse>();
        CreateMap<TransactionModel, TransactionResponse>();
        #endregion

    }


}