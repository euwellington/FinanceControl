using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Models.Entities;

public class Response
{
    public bool Error { get; set; }
    public string Message { get; set; } = string.Empty;

    public Response ResponseErro(string message)
    {
        return new Response
        {
            Error = true,
            Message = message
        };
    }

    public Response<T> ResponseSuccess<T>(string message, T? data = default)
    {
        return new Response<T>
        {
            Error = false,
            Message = message,
            Data = data
        };
    }
}

public class Response<T> : Response
{
    public T? Data { get; set; }
}

public class PagedResponse<T> : Response<IEnumerable<T>>
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public int TotalRecords { get; set; } = 0;
    public int TotalPages => (int)Math.Ceiling((double)TotalRecords / PageSize);

    public new PagedResponse<T> ResponseErro(string message)
    {
        return new PagedResponse<T>
        {
            Error = true,
            Message = message
        };
    }

    public PagedResponse<T> ResponseSuccess(string message, IEnumerable<T>? data = null, int totalRecords = 0, int page = 1, int pageSize = 10)
    {
        return new PagedResponse<T>
        {
            Error = false,
            Message = message,
            Data = data ?? new List<T>(),
            TotalRecords = totalRecords,
            Page = page,
            PageSize = pageSize
        };
    }
}