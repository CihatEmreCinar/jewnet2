using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Core.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add DbContext with SQL Server connection
builder.Services.AddDbContext<StoreContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<IProductRepository,ProductRepository>();

var app = builder.Build();

// Map Controllers (API Endpoints)
app.MapControllers();


try
{
    using var scope =app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredKeyedService<StoreContext>;
    await context.Database.MigrateAsync();
}
catch (System.Exception)
{
    
    throw;
}

// Run the application
app.Run();
