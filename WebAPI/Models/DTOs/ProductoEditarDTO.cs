namespace WebAPI.Models.DTOs
{
    public class ProductoEditarDTO
    {
        public int IdProducto { get; set; }
        public string? Nombre { get; set; }
        public string? Marca { get; set; }
        public bool? Completada { get; set; }
    }
}
