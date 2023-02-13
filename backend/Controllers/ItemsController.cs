using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("items")]
    public class ItemsController : ControllerBase
    {
        private readonly BackendContext _context;

        public ItemsController(BackendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            /*return await _context.Item.ToListAsync();*/
            return await _context.Item.ToArrayAsync();

        }

        // GET: items/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int? id)
        {
            if (id == null || _context.Item == null)
            {
                return NotFound();
            }

            var item = await _context.Item.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // POST: /items
        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem(Item item)
        {
            if (item == null || _context.Item == null)
            {
                return NotFound();
            }

            _context.Item.Add(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        // PUT: /items/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Item>> EditItem(int? id, Item item)
        {
            var existingItem = await _context.Item.FindAsync(id);
            if (existingItem is null)
            {
                return NotFound();
            }

            Item updatedItem = new()
            {
                Id = existingItem.Id,
                Name = item.Name,
                Value = item.Value,
                Category = item.Category
            };
            _context.Entry(existingItem).CurrentValues.SetValues(updatedItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: /items/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Item>> DeleteItem(int? id)
        {
            if (id == null || _context.Item == null)
            {
                return NotFound();
            }

            var item = await _context.Item.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Item.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
    }
}
