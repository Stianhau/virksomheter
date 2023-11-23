using Models;

namespace DTO
{
  public class AdresseInputDto
  {

    public required string Adresselinje_1 { get; set; }

    public string? Adresselinje_2 { get; set; }

    public required int Postnummer { get; set; }

    public required string Poststed { get; set; }
  }
}