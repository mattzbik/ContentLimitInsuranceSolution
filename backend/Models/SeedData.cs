using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ContentLimitInsurance.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new BackendContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<BackendContext>>()))
            {
                // Look for any Items.
                if (context.Item.Any())
                {
                    return;   // DB has been seeded
                }
                context.Item.AddRange(
                    new Item
                    {
                        Name = "TV",
                        Value = 2000,
                        Category = Category.Electronics,
                    },
                    new Item
                    {
                        Name = "Playstation",
                        Value = 400,
                        Category = Category.Electronics,
                    },
                    new Item
                    {
                        Name = "Stereo",
                        Value = 1600,
                        Category = Category.Electronics,
                    },
                    new Item
                    {
                        Name = "Shirts",
                        Value = 1100,
                        Category = Category.Clothing,
                    },
                    new Item
                    {
                        Name = "Jeans",
                        Value = 1100,
                        Category = Category.Clothing,
                    },
                    new Item
                    {
                        Name = "Pots and Pans",
                        Value = 3000,
                        Category = Category.Kitchen,
                    },
                    new Item
                    {
                        Name = "Flatware",
                        Value = 500,
                        Category = Category.Kitchen,
                    },
                    new Item
                    {
                        Name = "Knife Set",
                        Value = 500,
                        Category = Category.Kitchen,
                    },
                    new Item
                    {
                        Name = "Misc",
                        Value = 1000,
                        Category = Category.Kitchen,
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
