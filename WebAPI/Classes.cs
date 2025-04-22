using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI
{
    public class Article
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int id { get; set; }

        public string name { get; set; }

        public string uniqueNumber { get; set; }

        public bool canAssignQuantity { get; set; }

        public Article() {}

        public Article (string Name, string UniqueNumber, bool CanAssignQuantity)
        {
            name = Name;
            uniqueNumber = UniqueNumber;
            canAssignQuantity = CanAssignQuantity;
        }                
    }
    public class Quantity
    {
        public int id { get; set; }
                
        public int parentId { get; set; }

        public int kolvo { get; set; }

        public Quantity() { }

        public Quantity (int Id, int ParentId, int Kolvo)
        {
            id = Id;
            parentId = ParentId;
            kolvo = Kolvo;
        }
    }
   
}
