import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [categories]: any = await pool.query(
      "SELECT * FROM category"
    );

    return NextResponse.json({
      success: true,
      categories,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching category",
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(body);

    const { categoryName } = body;

    console.log(categoryName);

    await pool.query(
      "INSERT INTO category (name) VALUES (?)",
      [categoryName]
    );

    return NextResponse.json({
      success: true,
      message: "Category Added Successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, categoryName } = body;
    await pool.query(
      "update category set name=? where id=? ",
      [categoryName, id]
    );
    return NextResponse.json({
      success: true,
      message: "Category Name update",
    });
  }
  catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }

}
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    await pool.query(
      "Delete from category where id=?",
      [id]
    );
    return NextResponse.json({
      success: true,
      message: "Category Deleted Successfully"
    })

  }
  catch (error) {
    return NextResponse.json({
      success: false,
      message: "Category deletion failed"
    })
  }

}