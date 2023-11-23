using Models;

namespace DTO
{
    public class VirksomhetInputDto{
        public required int Organisasjonsnummer { get; set; }
        
        public required string Navn { get; set; }

        public required AdresseInputDto Adresse { get; set; }

        public required string Telefon { get; set; }
        
        public required string Epost { get; set; }
    }
}