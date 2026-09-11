import { NextResponse } from "next/server";
import pool from "@/lib/db";

// ===============================
// GET - Fetch Users
// ===============================
export async function GET(req: Request) {
  try {
    const [user]: any = await pool.query(
      "SELECT id, name, email FROM user"
    );

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching users",
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================
// PUT - Update User
// ===============================
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { id, name, email } = body;

    // Check required fields
    if (!id || !name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "ID, name and email are required",
        },
        {
          status: 400,
        }
      );
    }

    // Check duplicate email
    const [existingUser]: any = await pool.query(
      "SELECT id FROM user WHERE email = ? AND id != ?",
      [email, id]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Update user
    const [result]: any = await pool.query(
      "UPDATE user SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    );

    // User not found
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error updating user",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();

        const { id } = body;

        await pool.query(
            `DELETE FROM user WHERE id = ?`,
            [id]
        );

        return NextResponse.json({
            success: true,
            message: "User Deleted Successfully",
        });

    } catch (error) {
        console.error("Delete user error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Delete Failed",
            },
            {
                status: 500,
            }
        );
    }
}