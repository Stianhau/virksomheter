using Microsoft.EntityFrameworkCore;
using Models;

public class ApplicationDbContext : DbContext { 
  public required DbSet<Virksomhet> Virksomheter { get; set; }
  public required DbSet<Adresse> Adresser { get; set; }

  public ApplicationDbContext(DbContextOptions options) : base(options) {}
}
