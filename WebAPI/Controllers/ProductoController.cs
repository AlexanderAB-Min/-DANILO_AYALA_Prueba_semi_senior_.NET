using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Custom;
using WebAPI.Models;
using WebAPI.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly DbpruebaContext _dbPruebaContext;
        public ProductoController(DbpruebaContext dbPruebaContext)
        {
            _dbPruebaContext = dbPruebaContext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var lista = await _dbPruebaContext.Productos.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, new { value = lista });
        }

        [HttpPost]
        [Route("Crear")]
        public async Task<IActionResult> Crear(ProductoDTO objeto)
        {
            var modeloProducto = new Producto
            {
                Nombre = objeto.Nombre,
                Marca = objeto.Marca,
                Completada = objeto.Completada  // Cambiado de Precio
            };
            await _dbPruebaContext.Productos.AddAsync(modeloProducto);
            await _dbPruebaContext.SaveChangesAsync();
            if (modeloProducto.IdProducto != 0)
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
            else
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false });
        }

        [HttpPut]
        [Route("Editar/{idProducto}")]
        public async Task<IActionResult> Editar(int idProducto, ProductoDTO objeto)
        {
            var productoEncontrado = await _dbPruebaContext.Productos.FindAsync(idProducto);
            if (productoEncontrado == null)
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, mensaje = "Producto no encontrado" });
            // Actualizar los campos
            productoEncontrado.Nombre = objeto.Nombre ?? productoEncontrado.Nombre;
            productoEncontrado.Marca = objeto.Marca ?? productoEncontrado.Marca;
            productoEncontrado.Completada = objeto.Completada ?? productoEncontrado.Completada;  // Cambiado de Precio
            await _dbPruebaContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
        }

        [HttpDelete]
        [Route("Eliminar/{idProducto}")]
        public async Task<IActionResult> Eliminar(int idProducto)
        {
            var productoEncontrado = await _dbPruebaContext.Productos.FindAsync(idProducto);
            if (productoEncontrado == null)
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, mensaje = "Producto no encontrado" });
            _dbPruebaContext.Productos.Remove(productoEncontrado);
            await _dbPruebaContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
        }
    }
}