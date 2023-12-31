using System.ComponentModel.DataAnnotations;
using Models;

namespace DTO
{
    public class VirksomhetInputDto{
        [Required]
        public required int Organisasjonsnummer { get; set; }
        
        [Required]
        public required string Navn { get; set; }

        [Required]
        public required AdresseInputDto Adresse { get; set; }

        [Required]
        public required string Telefon { get; set; }
        
        [Required]
        public required string Epost { get; set; }
    }
}