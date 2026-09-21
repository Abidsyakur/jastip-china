import { PrismaClient, AdminRole, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding development database...\n");

  // --- Kategori ---
  const kategoriData = ["Tas", "Sepatu", "Aksesoris", "Elektronik", "Fashion"];
  const kategoriMap: Record<string, string> = {};

  for (const nama of kategoriData) {
    const kategori = await prisma.kategori.upsert({
      where: { id: `seed-${nama.toLowerCase()}` },
      update: {},
      create: { id: `seed-${nama.toLowerCase()}`, namaKategori: nama },
    });
    kategoriMap[nama] = kategori.id;
  }
  console.log(`✓ ${kategoriData.length} kategori dibuat`);

  // --- Admin OWNER ---
  const adminEmail = "admin@jastipchina.local";
  let admin = await prisma.admin.findUnique({ where: { email: adminEmail } });

  if (!admin) {
    const passwordAcak = crypto.randomBytes(9).toString("base64url");
    const passwordHash = await bcrypt.hash(passwordAcak, 12);
    admin = await prisma.admin.create({
      data: {
        nama: "Owner",
        noWa: "081200000000",
        email: adminEmail,
        passwordHash,
        role: AdminRole.OWNER,
      },
    });
    console.log(`✓ Admin OWNER dibuat`);
    console.log(`  Email    : ${adminEmail}`);
    console.log(`  Password : ${passwordAcak}\n`);
  } else {
    console.log(`✓ Admin sudah ada\n`);
  }

  // --- Kurs Master ---
  const kursMaster = await prisma.kursMaster.findFirst({
    orderBy: { dibuatPada: "desc" },
  });

  if (!kursMaster) {
    await prisma.kursMaster.create({
      data: {
        kursRmbIdr: new Prisma.Decimal("2350.50"),
        adminId: admin.id,
      },
    });
    console.log(`✓ Kurs aktif: Rp 2.350,50 / RMB\n`);
  }

  // --- Sample Products (detailed) ---
  const produkData = [
    {
      nama: "Tas Backpack Branded",
      kategori: "Tas",
      hargaRmb: 120,
      beratGram: 800,
      gambar: ["https://via.placeholder.com/400x400?text=Backpack+1", "https://via.placeholder.com/400x400?text=Backpack+2"],
      varian: [
        { nama: "Hitam", stock: 15, tambahan: 0 },
        { nama: "Biru", stock: 10, tambahan: 0 },
        { nama: "Merah", stock: 8, tambahan: 0 },
      ],
    },
    {
      nama: "Sepatu Olahraga Lari",
      kategori: "Sepatu",
      hargaRmb: 85,
      beratGram: 500,
      gambar: ["https://via.placeholder.com/400x400?text=Sepatu+1"],
      varian: [
        { nama: "Size 38", stock: 5, tambahan: 0 },
        { nama: "Size 39", stock: 8, tambahan: 0 },
        { nama: "Size 40", stock: 10, tambahan: 0 },
        { nama: "Size 41", stock: 7, tambahan: 0 },
      ],
    },
    {
      nama: "Jam Tangan Digital",
      kategori: "Aksesoris",
      hargaRmb: 45,
      beratGram: 150,
      gambar: ["https://via.placeholder.com/400x400?text=Watch+1", "https://via.placeholder.com/400x400?text=Watch+2"],
      varian: [
        { nama: "Hitam", stock: 20, tambahan: 0 },
        { nama: "Silver", stock: 15, tambahan: 0 },
        { nama: "Gold", stock: 12, tambahan: 50000 },
      ],
    },
    {
      nama: "Power Bank 10000mAh",
      kategori: "Elektronik",
      hargaRmb: 35,
      beratGram: 250,
      gambar: ["https://via.placeholder.com/400x400?text=PowerBank+1"],
      varian: [
        { nama: "Putih", stock: 25, tambahan: 0 },
        { nama: "Hitam", stock: 20, tambahan: 0 },
      ],
    },
    {
      nama: "Topi Snapback Premium",
      kategori: "Fashion",
      hargaRmb: 28,
      beratGram: 120,
      gambar: ["https://via.placeholder.com/400x400?text=Cap+1", "https://via.placeholder.com/400x400?text=Cap+2"],
      varian: [
        { nama: "Logo Merah", stock: 18, tambahan: 0 },
        { nama: "Logo Biru", stock: 15, tambahan: 0 },
        { nama: "Logo Hitam", stock: 22, tambahan: 0 },
      ],
    },
    {
      nama: "Kaos Casual Cotton",
      kategori: "Fashion",
      hargaRmb: 15,
      beratGram: 180,
      gambar: ["https://via.placeholder.com/400x400?text=Shirt+1"],
      varian: [
        { nama: "Size M - Putih", stock: 30, tambahan: 0 },
        { nama: "Size L - Putih", stock: 25, tambahan: 0 },
        { nama: "Size M - Hitam", stock: 20, tambahan: 0 },
        { nama: "Size L - Hitam", stock: 18, tambahan: 0 },
      ],
    },
    {
      nama: "Dompet Kulit Asli",
      kategori: "Tas",
      hargaRmb: 95,
      beratGram: 300,
      gambar: ["https://via.placeholder.com/400x400?text=Wallet+1"],
      varian: [
        { nama: "Coklat Muda", stock: 12, tambahan: 0 },
        { nama: "Coklat Gelap", stock: 10, tambahan: 0 },
        { nama: "Hitam", stock: 14, tambahan: 0 },
      ],
    },
    {
      nama: "Headphone Wireless",
      kategori: "Elektronik",
      hargaRmb: 120,
      beratGram: 280,
      gambar: ["https://via.placeholder.com/400x400?text=Headphone+1", "https://via.placeholder.com/400x400?text=Headphone+2"],
      varian: [
        { nama: "Hitam", stock: 8, tambahan: 0 },
        { nama: "Biru", stock: 6, tambahan: 0 },
      ],
    },
    {
      nama: "Sunglasses UV Protection",
      kategori: "Aksesoris",
      hargaRmb: 52,
      beratGram: 90,
      gambar: ["https://via.placeholder.com/400x400?text=Sunglasses+1"],
      varian: [
        { nama: "Hitam", stock: 25, tambahan: 0 },
        { nama: "Coklat", stock: 20, tambahan: 0 },
      ],
    },
    {
      nama: "Scarpin High Heels",
      kategori: "Sepatu",
      hargaRmb: 75,
      beratGram: 450,
      gambar: ["https://via.placeholder.com/400x400?text=Heels+1", "https://via.placeholder.com/400x400?text=Heels+2"],
      varian: [
        { nama: "Size 35", stock: 6, tambahan: 0 },
        { nama: "Size 36", stock: 8, tambahan: 0 },
        { nama: "Size 37", stock: 7, tambahan: 0 },
        { nama: "Size 38", stock: 5, tambahan: 0 },
      ],
    },
    {
      nama: "Rangka Kacamata Fashion",
      kategori: "Aksesoris",
      hargaRmb: 38,
      beratGram: 80,
      gambar: ["https://via.placeholder.com/400x400?text=Glasses+1"],
      varian: [
        { nama: "Cat Eye - Hitam", stock: 16, tambahan: 0 },
        { nama: "Cat Eye - Tortoise", stock: 12, tambahan: 0 },
        { nama: "Round - Emas", stock: 10, tambahan: 50000 },
      ],
    },
    {
      nama: "Celana Jeans Slim Fit",
      kategori: "Fashion",
      hargaRmb: 42,
      beratGram: 550,
      gambar: ["https://via.placeholder.com/400x400?text=Jeans+1"],
      varian: [
        { nama: "Size 28 - Biru", stock: 10, tambahan: 0 },
        { nama: "Size 30 - Biru", stock: 14, tambahan: 0 },
        { nama: "Size 32 - Biru", stock: 12, tambahan: 0 },
        { nama: "Size 28 - Hitam", stock: 8, tambahan: 0 },
      ],
    },
    {
      nama: "Jaket Windbreaker",
      kategori: "Fashion",
      hargaRmb: 68,
      beratGram: 600,
      gambar: ["https://via.placeholder.com/400x400?text=Jacket+1"],
      varian: [
        { nama: "Merah", stock: 12, tambahan: 0 },
        { nama: "Biru", stock: 10, tambahan: 0 },
        { nama: "Hitam", stock: 15, tambahan: 0 },
      ],
    },
    {
      nama: "Tas Sling Kulit",
      kategori: "Tas",
      hargaRmb: 85,
      beratGram: 500,
      gambar: ["https://via.placeholder.com/400x400?text=Sling+1", "https://via.placeholder.com/400x400?text=Sling+2"],
      varian: [
        { nama: "Coklat", stock: 9, tambahan: 0 },
        { nama: "Hitam", stock: 11, tambahan: 0 },
      ],
    },
  ];

  let produkCounter = 0;
  for (const prod of produkData) {
    const produkId = `seed-${prod.nama.toLowerCase().replace(/\s+/g, "-")}`;
    const kategoriId = kategoriMap[prod.kategori];

    const kurs = await prisma.kursMaster.findFirst({
      orderBy: { dibuatPada: "desc" },
    });
    const hargaJual = Math.round(prod.hargaRmb * Number(kurs?.kursRmbIdr || 2350));

    const produk = await prisma.produk.upsert({
      where: { id: produkId },
      update: {},
      create: {
        id: produkId,
        adminId: admin.id,
        kategoriId: kategoriId!,
        namaProduk: prod.nama,
        deskripsi: `Produk berkualitas dari China. Berat: ${prod.beratGram}g`,
        hargaAsalRmb: new Prisma.Decimal(prod.hargaRmb),
        kurs: kurs?.kursRmbIdr || new Prisma.Decimal(2350),
        hargaJualIdr: hargaJual,
        beratGram: prod.beratGram,
        linkSumber: "https://example.com",
        stok: prod.varian.reduce((sum, v) => sum + v.stock, 0),
        status: "AKTIF",
      },
    });

    // Add gambar
    for (let i = 0; i < prod.gambar.length; i++) {
      await prisma.produkGambar.upsert({
        where: {
          id: `${produkId}-gambar-${i}`,
        },
        update: {},
        create: {
          id: `${produkId}-gambar-${i}`,
          produkId: produk.id,
          urlGambar: prod.gambar[i]!,
          urutan: i,
        },
      });
    }

    // Add varian
    for (const v of prod.varian) {
      await prisma.produkVarian.upsert({
        where: {
          id: `${produkId}-varian-${v.nama.toLowerCase().replace(/\s+/g, "-")}`,
        },
        update: {},
        create: {
          id: `${produkId}-varian-${v.nama.toLowerCase().replace(/\s+/g, "-")}`,
          produkId: produk.id,
          namaVarian: v.nama,
          stok: v.stock,
          hargaTambahan: v.tambahan,
        },
      });
    }

    produkCounter++;
  }
  console.log(`✓ ${produkCounter} produk + gambar + varian dibuat`);

  // --- Sample Customers ---
  const customerData = [
    {
      noWa: "6281234567890",
      nama: "Budi Santoso",
      password: "customer123",
    },
    {
      noWa: "6289876543210",
      nama: "Siti Nurhaliza",
      password: "customer456",
    },
  ];

  let customerCounter = 0;
  const customerMap: Record<string, string> = {};

  for (const cust of customerData) {
    const existing = await prisma.customer.findUnique({
      where: { noWa: cust.noWa },
    });

    if (!existing) {
      const passwordHash = await bcrypt.hash(cust.password, 12);
      const customer = await prisma.customer.create({
        data: {
          nama: cust.nama,
          noWa: cust.noWa,
          email: `${cust.nama.toLowerCase().replace(/\s+/g, ".")}@example.com`,
          passwordHash,
        },
      });
      customerMap[cust.noWa] = customer.id;
      customerCounter++;
    } else {
      customerMap[cust.noWa] = existing.id;
    }
  }
  console.log(`✓ ${customerCounter} customer sampel dibuat`);

  // --- Sample Alamat untuk Customer ---
  for (const [noWa, customerId] of Object.entries(customerMap)) {
    const alamatExist = await prisma.alamat.findFirst({
      where: { customerId },
    });

    if (!alamatExist) {
      await prisma.alamat.create({
        data: {
          customerId,
          label: "Rumah",
          penerima: "Penerima Sampel",
          noTelp: noWa,
          alamatLengkap: "Jl. Merdeka No. 123, Kota Bandung",
          kota: "Bandung",
          provinsi: "Jawa Barat",
          kodePos: "40123",
        },
      });
    }
  }
  console.log(`✓ Alamat sampel dibuat untuk customer`);

  console.log("\n✅ Development seed selesai!\n");
  console.log("🔐 Test credentials:");
  console.log("   Admin:");
  console.log(`     Email: ${adminEmail}`);
  console.log("   Customers:");
  for (const cust of customerData) {
    console.log(`     WA: ${cust.noWa}, Password: ${cust.password}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
