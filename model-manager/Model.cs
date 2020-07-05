using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace model_manager
{
    public class MediaContext : DbContext
    {
        public DbSet<Media> Medias { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=media-manager.db");
    }
}
