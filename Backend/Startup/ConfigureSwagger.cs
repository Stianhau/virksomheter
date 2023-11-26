using Microsoft.OpenApi.Models;
using System.Reflection;

namespace Startup
{
    /// <summary>
    /// Swagger extension methods
    /// </summary>
    public static class RegisterSwagger
    {
        /// <summary>
        /// Configure swagger
        /// </summary>
        /// <param name="services"></param>
        public static void ConfigureSwagger(this IServiceCollection services, bool securityEnabled)
        {
            services.AddSwaggerGen(c =>
             {
                 c.SwaggerDoc("v1", new OpenApiInfo { Version = "v1", Title = "Virksomheter Api" });
                 //  c.EnableAnnotations();
                 if (securityEnabled)
                 {
                     c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                     {
                         In = ParameterLocation.Header,
                         Description = "Please insert JWT with Bearer into field",
                         Name = "Authorization",
                         Type = SecuritySchemeType.ApiKey
                     });

                     c.AddSecurityRequirement(new OpenApiSecurityRequirement
                 {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }});
                 }

             });
        }

        /// <summary>
        /// Swagger UI
        /// </summary>
        /// <param name="app"></param>
        public static void ConfigureSwaggerUI(this WebApplication app)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI();
            //   c =>
            // {
            //     c.SwaggerEndpoint("/swagger/v1/swagger.json", "Projstats API V1");
            //     c.RoutePrefix = "api/swagger";
            //     c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
            // });
        }
    }
}
