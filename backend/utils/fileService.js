import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../data");

export const ensureDataFiles = async () => {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const files = [
      { name: "ejercicios.json", initial: [] },
      { name: "usuarios.json", initial: [] },
      { name: "sesiones.json", initial: [] }
    ];
    for (const f of files) {
      const p = path.join(dataDir, f.name);
      try {
        await fs.access(p);
      } catch {
        await fs.writeFile(p, JSON.stringify(f.initial, null, 2), "utf-8");
      }
    }
  } catch (err) {
    console.error("Error creando data files:", err);
    throw err;
  }
};

export const readJSON = async (filename) => {
  const p = path.join(dataDir, filename);
  const raw = await fs.readFile(p, "utf-8");
  return JSON.parse(raw);
};

export const writeJSON = async (filename, data) => {
  const p = path.join(dataDir, filename);
  await fs.writeFile(p, JSON.stringify(data, null, 2), "utf-8");
};
