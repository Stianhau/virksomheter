using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{

  public class Adresse
  {
    [Key]
    [Required]
    public int Id { get; set; }
    
    [Required]
    public required string Adresselinje_1 { get; set; }

    public string? Adresselinje_2 { get; set; }
    
    [Required]
    public required int Postnummer { get; set; }

    [Required]
    public required string Poststed { get; set; }
  } 
}