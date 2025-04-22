using Microsoft.EntityFrameworkCore;
using WebAPI;
using WebAPI.DataAccess;
using Microsoft.AspNetCore.Cors;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MsSqlContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                              builder.AllowAnyHeader()
                                         .AllowAnyOrigin()
                                         .AllowAnyMethod();
                      });
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();


app.MapGet("/Articles",  async (MsSqlContext dbms) =>
{
    var result =
       from articles in dbms.Articles.AsNoTracking()
       select new
       {
           articleId = articles.id,
           articleName = articles.name,
           uniqueNumber = articles.uniqueNumber,
           canAssignQuantity = articles.canAssignQuantity
       };
    return Results.Ok(result);
});

app.MapGet("/Quantities",  async (MsSqlContext dbms) =>
{    
    var result =
      from quantities in dbms.Quantities
          // join articles in dbms.Articles 
          //   on articles.id equals quantities.parentId
          //where quantities.parentId = id
      select new
        {
            id = quantities.id,
          //  articleName = articles.name,
            parentId = quantities.parentId,
            kolvo = quantities.kolvo
        };
    return Results.Ok(result);

});

app.MapPost("/CreateArticle/{name}/{uniquenum}/{canAssignQuantity}",
     async (string name, string uniquenum, bool canAssignQuantity, MsSqlContext db) =>
     {
         Article article = new Article(name, uniquenum, canAssignQuantity);
         db.Articles.Add(article);
         await db.SaveChangesAsync();
         return Results.Ok($"Article {name} was added.");
     });

app.MapPut("/UpdateKolvo/{parentId}/{childId}/{kolvo}",    
    async (int parentId, int childId, int kolvo, MsSqlContext db) =>
    {
        Quantity quantity = new Quantity(childId, parentId, kolvo);

        var existingQuantity = await db.Quantities.FirstOrDefaultAsync(p => p.parentId == quantity.parentId && p.id == quantity.id);

        if (existingQuantity != null)
            existingQuantity.kolvo = kolvo;
        else
            db.Quantities.Add(quantity);

        await db.SaveChangesAsync();
    });

app.Run();


