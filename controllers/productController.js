import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  //console.log("BODY:", req.body);
  //console.log("FILE:", req.file);

  try {
    const { name, size, category, section, mrp, note } = req.body;

    if (!name || !size || !category || !section || !mrp) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const sizesArray = size.split(",").map((s) => s.trim());

    const product = await Product.create({
      name,
      sizes: sizesArray,
      category,
      section,
      mrp: Number(mrp),
      note: note || "",
      image: req.file?.path || "",
    });

    return res.status(201).json(product);
  } catch (err) {
    console.error("🔥 FULL ERROR:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { name, category, section, size, minMRP, maxMRP, page = 1, limit = 20 } = req.query;

    const query = {};

    // 🔥 GLOBAL SEARCH
    if (name) {
      query.$or = [
        { name: { $regex: name, $options: "i" } },
        { category: { $regex: name, $options: "i" } },
        { section: { $regex: name, $options: "i" } },
        { sizes: { $regex: name, $options: "i" } },
        !isNaN(name) ? { mrp: Number(name) } : null,
      ].filter(Boolean);
    }

    if (category) query.category = category;
    if (section) query.section = section;
    if (size) query.sizes = size;

    if (minMRP || maxMRP) {
      query.mrp = {
        $gte: Number(minMRP) || 0,
        $lte: Number(maxMRP) || Number.MAX_SAFE_INTEGER,
      };
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      totalPages: Math.ceil(total / limit),
      page: Number(page),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { name, size, category, section, mrp, note } = req.body;

    const updateData = {
      ...(name && { name }),
      ...(size && { sizes: size.split(",").map((s) => s.trim()) }),
      ...(category && { category }),
      ...(section && { section }),
      ...(mrp && { mrp: Number(mrp) }),
      ...(note !== undefined && { note }),
      ...(req.file && { image: req.file.path }),
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    return res.json(updatedProduct);
  } catch (err) {
    console.error("Update Product Error:", err);
    return res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    return res.json({ success: true });
  } catch (err) {
    console.error("Delete Product Error:", err);
    return res.status(500).json({ message: "Failed to delete product" });
  }
};
