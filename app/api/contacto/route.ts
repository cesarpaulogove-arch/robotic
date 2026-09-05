import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      nome,
      email,
      telefone,
      assunto,
      mensagem,
    } = body;

    // =========================
    // VALIDAÇÃO
    // =========================

    if (
      !nome ||
      !email ||
      !telefone ||
      !assunto ||
      !mensagem
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Todos os campos obrigatórios devem ser preenchidos.",
        },
        { status: 400 }
      );
    }

    // =========================
    // ENVIO DO EMAIL
    // =========================

    const { data, error } = await resend.emails.send({
      from: "WSCODE <onboarding@resend.dev>",
      to: ["govecesarpaulo@gmail.com"],

      subject: `Novo contacto WSCODE — ${assunto}`,

      replyTo: email,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          background:#001124;
          padding:30px;
          color:#ffffff;
        ">

          <div style="
            max-width:600px;
            margin:auto;
            background:#011a32;
            border:1px solid #1361ab;
            border-radius:16px;
            padding:25px;
          ">

            <h1 style="
              margin-top:0;
              color:#00bfff;
              font-size:26px;
            ">
              Novo contacto WSCODE
            </h1>

            <p style="
              color:#b8c4d0;
              font-size:14px;
            ">
              Alguém enviou uma mensagem através do formulário
              de contacto do website.
            </p>

            <hr style="
              border:none;
              border-top:1px solid #16456d;
              margin:20px 0;
            "/>

            <h3 style="color:#00bfff;">
              Dados do visitante
            </h3>

            <p>
              <strong>Nome:</strong><br/>
              ${escapeHtml(nome)}
            </p>

            <p>
              <strong>Email:</strong><br/>
              ${escapeHtml(email)}
            </p>

            <p>
              <strong>Telefone:</strong><br/>
              ${escapeHtml(telefone)}
            </p>

            <p>
              <strong>Assunto:</strong><br/>
              ${escapeHtml(assunto)}
            </p>

            <h3 style="
              color:#00bfff;
              margin-top:25px;
            ">
              Mensagem
            </h3>

            <div style="
              background:#001124;
              border:1px solid #16456d;
              border-radius:10px;
              padding:15px;
              line-height:1.6;
            ">
              ${escapeHtml(mensagem).replace(/\n/g, "<br/>")}
            </div>

            <hr style="
              border:none;
              border-top:1px solid #16456d;
              margin:25px 0;
            "/>

            <p style="
              color:#64748b;
              font-size:12px;
            ">
              Esta mensagem foi enviada automaticamente
              através do formulário de contacto WSCODE.
            </p>

          </div>

        </div>
      `,
    });

    if (error) {
      console.error("Erro Resend:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Não foi possível enviar o email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mensagem enviada com sucesso.",
      id: data?.id,
    });

  } catch (error) {
    console.error("Erro API contacto:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor.",
      },
      { status: 500 }
    );
  }
}

// =========================
// PROTEÇÃO CONTRA HTML
// =========================

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}