using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{

  public class Virksomhet
  {
    // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    [Required]
    public int Id { get; set; }
    
    [Required]
    public required int Organisasjonsnummer { get; set; }
    
    [Required]
    public required string Navn { get; set; }

    [Required]
    public int AdresseId { get; set; }

    [ForeignKey("AdresseId")]
    public required Adresse Adresse { get; set; }

    [Required]
    public required string Telefon { get; set; }
    
    [Required]
    public required string Epost { get; set; }
  } 
}