using Microsoft.AspNetCore.Identity.UI.Services;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    // Bu sınıf hiçbir şey yapmıyor
    public class NoOpEmailSender<TUser> : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            // Devre dışı bırakıldı
            return Task.CompletedTask;
        }
    }
}
