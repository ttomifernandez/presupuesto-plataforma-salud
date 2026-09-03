"use client";

import { useState } from "react";
import {
  Calendar, CheckCircle2, ChevronDown, Check, X,
  MessageCircle, Clock, ArrowRight, Sparkles, Repeat,
  Wallet, BellRing, ShieldCheck, HeartPulse, FileText,
  Lock, Star, Printer, type LucideIcon,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════
//  CONFIGURACIÓN — completar antes de enviar al cliente
// ══════════════════════════════════════════════════════════════
const PRECIO_1 = "$ ________";     // Ej: "$ 380.000"
const PRECIO_2 = "$ ________";     // Ej: "$ 520.000"
const MANTENIMIENTO = 30_000;
const WHATSAPP = "5493511234567";   // Cambiar al número real
const FECHA = "Agosto 2026";
const VALIDEZ_DIAS = 30;
// ══════════════════════════════════════════════════════════════

const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const waAprobar = (op: number) =>
  wa(`Hola! Quiero aprobar la Opción ${op} del presupuesto de la plataforma de salud. ¿Cómo seguimos?`);
const waConsulta = () =>
  wa("Hola! Tengo algunas dudas sobre el presupuesto de la plataforma de salud. ¿Podemos hablar?");
const fmt = (n: number) =>
  "AR$ " + n.toLocaleString("es-AR", { maximumFractionDigits: 0 });

const MODULOS_COMUNES = [
  {
    icon: HeartPulse,
    titulo: "Landing profesional",
    desc: "Diseño a medida para el sector salud: inicio, servicios de nutrición y psicología, proceso de atención, testimonios y preguntas frecuentes.",
    features: ["Secciones de quiénes son y su enfoque", "Formulario de contacto directo", "SEO básico configurado", "Adaptada a celular y tablet"],
  },
  {
    icon: Calendar,
    titulo: "Sistema de turnos online",
    desc: "Los pacientes reservan su turno directo desde la web, sin llamadas ni idas y vueltas.",
    features: ["Calendario por profesional (nutricionista / psicóloga)", "Confirmación por email", "Recordatorio 24 hs antes del turno", "Cancelación y reprogramación libre", "La profesional confirma desde el panel (sin WhatsApp automático)"],
  },
  {
    icon: ShieldCheck,
    titulo: "Panel de cada profesional",
    desc: "Una vista clara de la agenda, los pacientes y los planes. Sin Excel, sin WhatsApp grupal.",
    features: ["Ver y gestionar turnos del día y la semana", "Bloquear horarios y vacaciones", "Subir planes en PDF o imagen", "Listado de pacientes con historial de turnos"],
  },
  {
    icon: BellRing,
    titulo: "Recordatorios automáticos",
    desc: "El sistema avisa por email. Pueden configurar recordatorios, sin que tengan que estar mirando el sistema todo el día.",
    features: ["Email de confirmación al reservar", "Recordatorio 24 hs antes"],
  },
];

const MODULOS_OPCION2 = [
  {
    icon: Lock,
    titulo: "Portal de pacientes (login)",
    desc: "Los pacientes acceden con email y contraseña a su espacio personal y seguro.",
    features: ["Registro y login seguros", "Ver sus turnos próximos e historial", "Descargar sus planes de nutrición", "Historial de consultas"],
  },
  {
    icon: FileText,
    titulo: "Panel profesional mejorado",
    desc: "Las profesionales cargan el plan de cada paciente de forma organizada y trazable.",
    features: ["Cargar planes por paciente específico", "Control de versiones de planes", "Comentarios internos por paciente", "Vista de historial completo"],
  },
];

const FAQS = [
  {
    q: "¿Necesito contratar hosting aparte?",
    a: "No. El hosting y el dominio del primer año están bonificados (sin costo). A partir del segundo año el hosting tiene un costo de AR$ 95.000/año, que se renueva de forma independiente.",
  },
  {
    q: "¿Puedo arrancar con Opción 1 y agregar el portal de pacientes después?",
    a: "Sí. El sistema está pensado para crecer. Si en algún momento querés sumar el portal, el costo es la diferencia entre ambas opciones, no un rediseño desde cero.",
  },
  {
    q: "¿El sistema funciona para las dos profesionales por separado?",
    a: "Sí. Cada una tiene su propio calendario, su disponibilidad y su panel independiente. Los pacientes eligen con quién sacar turno.",
  },
  {
    q: "¿Cómo reciben los turnos nuevos?",
    a: "Reciben un email al instante. No tienen que estar mirando el sistema todo el día.",
  },
  {
    q: "¿Qué pasa si quiero hacer un cambio después del lanzamiento?",
    a: "Para eso existe el mantenimiento mensual. Incluye actualizaciones, pequeños ajustes y soporte. Cambios grandes se presupuestan aparte.",
  },
];

// ── Component ────────────────────────────────

export default function Presupuesto() {
  const [opcion, setOpcion] = useState<1 | 2>(1);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100 font-sans antialiased">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0a0f1e]/85 border-b border-slate-800/70">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/15 grid place-items-center border border-teal-500/30">
              <HeartPulse className="w-4 h-4 text-teal-400" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold text-sm text-slate-100">Nutrición &amp; Psicología</span>
              <span className="text-[10px] text-slate-500 font-medium">Plataforma bariátrica · VanzaCode</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex rounded-lg border border-slate-800 p-0.5 text-xs">
              {([1, 2] as const).map((op) => (
                <button
                  key={op}
                  onClick={() => setOpcion(op)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    opcion === op ? "bg-teal-600 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Opción {op}
                </button>
              ))}
            </div>
            <a
              href={waAprobar(opcion)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" /> Aprobar
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-16">

        {/* ── Hero ── */}
        <section className="relative pt-16 sm:pt-24 pb-12 text-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_0%,rgba(20,184,166,0.12),transparent_70%)]" />
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-300 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            Propuesta para revisión · {FECHA}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
            Plataforma digital para<br />
            <span className="text-teal-400">profesionales de la salud</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Landing profesional + sistema de turnos online para la atención de
            pacientes en proceso bariátrico. El sistema trabaja por ustedes las
            24 horas, incluso cuando el consultorio está cerrado.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center gap-3">
            <a
              href={waAprobar(opcion)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
            >
              Aprobar propuesta <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={waConsulta()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium px-6 py-3.5 rounded-xl transition-colors"
            >
              Tengo dudas
            </a>
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { v: "1 sem.", l: "Plazo de entrega" },
              { v: "2", l: "Agendas independientes" },
              { v: "100%", l: "A medida" },
              { v: "24/7", l: "Sistema online" },
            ].map((h) => (
              <div key={h.l} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="text-xl sm:text-2xl font-bold text-teal-400">{h.v}</div>
                <div className="text-xs text-slate-500 mt-1">{h.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Opciones ── */}
        <Sec icon={Sparkles} eyebrow="Dos caminos posibles" title="Elegí el que mejor se adapta a este momento">
          <div className="flex sm:hidden rounded-lg border border-slate-800 p-0.5 text-sm mb-4">
            {([1, 2] as const).map((op) => (
              <button
                key={op}
                onClick={() => setOpcion(op)}
                className={`flex-1 py-2 rounded-md font-medium transition-colors ${
                  opcion === op ? "bg-teal-600 text-white" : "text-slate-400"
                }`}
              >
                Opción {op}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <OptionCard
              op={1}
              selected={opcion === 1}
              onClick={() => setOpcion(1)}
              titulo="Landing + Sistema de Turnos"
              desc="Sitio web profesional y reserva de turnos online. Ideal para digitalizar la atención sin complicaciones."
              precio={PRECIO_1}
            />
            <OptionCard
              op={2}
              selected={opcion === 2}
              onClick={() => setOpcion(2)}
              titulo="Landing + Turnos + Portal Paciente"
              desc="Todo lo anterior más un portal privado donde cada paciente ve sus turnos, descarga sus planes y lleva su historial."
              precio={PRECIO_2}
              badge="Más completa"
            />
          </div>
        </Sec>

        {/* ── Módulos ── */}
        <Sec
          icon={CheckCircle2}
          eyebrow={`Opción ${opcion} · qué incluye`}
          title="Todo lo que recibís"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            {MODULOS_COMUNES.map((m) => (
              <ModuloCard key={m.titulo} m={m} />
            ))}
            {opcion === 2 &&
              MODULOS_OPCION2.map((m) => (
                <ModuloCard key={m.titulo} m={m} extra />
              ))}
          </div>
          {opcion === 1 && (
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-400">
                <strong className="text-slate-200">¿Querés sumar el portal después?</strong>{" "}
                El sistema está diseñado para crecer. Podés agregar la Opción 2 en
                cualquier momento pagando solo la diferencia.
              </p>
            </div>
          )}
        </Sec>

        {/* ── Plazo ── */}
        <Sec icon={Clock} eyebrow="Tiempo de entrega" title="Plazo de entrega: 1 semana">
          <div className="rounded-xl border border-teal-500/20 bg-teal-500/[0.05] p-6 max-w-lg flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 grid place-items-center shrink-0">
              <Clock className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-slate-200 font-medium">El sistema queda listo y en funcionamiento en 1 semana desde que confirmás.</p>
              <p className="mt-1 text-sm text-slate-400">Incluye diseño, desarrollo, pruebas y puesta en marcha. Sin fases ni entregas parciales.</p>
            </div>
          </div>
        </Sec>

        {/* ── Precio ── */}
        <Sec icon={Wallet} eyebrow="Inversión" title="Precio del proyecto">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                op: 1 as const,
                nombre: "Opción 1 — Landing + Turnos",
                precio: PRECIO_1,
                nota: "Para empezar a digitalizar la atención ahora.",
                destacado: false,
              },
              {
                op: 2 as const,
                nombre: "Opción 2 — + Portal Paciente",
                precio: PRECIO_2,
                nota: "Para darle a cada paciente una experiencia completa.",
                destacado: true,
              },
            ].map((item) => (
              <div
                key={item.op}
                className={`rounded-2xl border p-6 flex flex-col gap-4 ${
                  item.destacado
                    ? "border-teal-500/40 bg-gradient-to-b from-teal-500/10 to-transparent"
                    : "border-slate-800 bg-slate-900/50"
                }`}
              >
                {item.destacado && (
                  <span className="self-start inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide bg-teal-600 text-white px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 fill-current" /> Más completa
                  </span>
                )}
                <div>
                  <div className="text-sm text-slate-500">{item.nombre}</div>
                  <div className="mt-1 text-3xl sm:text-4xl font-bold text-slate-100">{item.precio}</div>
                  <div className="mt-1 text-xs text-emerald-400">{item.nota}</div>
                </div>
                <a
                  href={waAprobar(item.op)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                >
                  <Check className="w-4 h-4" /> Elegir Opción {item.op}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <h4 className="font-semibold text-emerald-300 mb-3">Incluye en ambas opciones</h4>
              <ul className="space-y-2">
                {[
                  "Hosting y dominio — Año 1 sin costo (bonificado)",
                  "Diseño responsivo (celular, tablet y PC)",
                  "Capacitación a las profesionales",
                  "30 días de garantía post-lanzamiento",
                  "Código fuente entregado",
                ].map((i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-400">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
              <h4 className="font-semibold text-slate-400 mb-3">No incluye</h4>
              <ul className="space-y-2">
                {[
                  "Redacción de textos ni fotografías",
                  "Integración con historia clínica electrónica u otros sistemas externos",
                  "Funcionalidades fuera del alcance acordado",
                ].map((i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-400">
                    <X className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Sec>

        {/* ── Hosting ── */}
        <Sec icon={Wallet} eyebrow="Hosting anual" title="Costo de hosting a partir del Año 2">
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-400 mb-2">Año 1</div>
              <div className="text-2xl font-bold text-slate-100">AR$ 0</div>
              <div className="mt-1 text-sm text-slate-400">Bonificado — incluido en el proyecto</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">A partir del Año 2</div>
              <div className="text-2xl font-bold text-slate-100">AR$ 95.000<span className="text-base font-normal text-slate-500">/año</span></div>
              <div className="mt-1 text-sm text-slate-400">Renovación anual · se paga de forma independiente</div>
            </div>
          </div>
        </Sec>

        {/* ── Mantenimiento ── */}
        <Sec icon={Repeat} eyebrow="Mensual · opcional" title="Mantenimiento y soporte">
          <div className="rounded-xl border border-teal-500/30 bg-teal-500/[0.06] p-6 max-w-md relative">
            <span className="absolute -top-2.5 left-5 text-[10px] font-semibold uppercase tracking-wide bg-teal-600 text-white px-2 py-0.5 rounded-full">
              Recomendado
            </span>
            <div className="font-semibold text-slate-100">Plan mensual</div>
            <div className="mt-1 text-2xl font-bold text-slate-100">
              {fmt(MANTENIMIENTO)}
              <span className="text-sm font-normal text-slate-500">/mes</span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {[
                "Correcciones y ajustes menores",
                "Actualizaciones de seguridad",
                "Soporte técnico ante imprevistos",
                "Respaldo mensual de la base de datos",
                "Una hora de cambios de contenido por mes",
              ].map((i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-400">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {i}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            El mantenimiento es opcional y se contrata aparte del proyecto. Sin él el sistema funciona igual, pero los ajustes se presupuestan por separado.
          </p>
        </Sec>

        {/* ── Condiciones ── */}
        <Sec icon={Clock} eyebrow="Condiciones comerciales" title="Cómo trabajamos">
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                titulo: "Forma de pago",
                items: ["50% anticipo al iniciar", "50% al entregar el sistema", "Transferencia bancaria o Mercado Pago"],
              },
              {
                titulo: "Plazo de entrega",
                items: ["1 semana desde el inicio", "Arranca al confirmar el anticipo", "Revisiones incluidas en ese tiempo"],
              },
              {
                titulo: "Garantía",
                items: ["30 días post-lanzamiento sin cargo", "Correcciones de errores incluidas", "Entrega completa del código fuente"],
              },
            ].map((c) => (
              <div key={c.titulo} className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                <h4 className="font-semibold text-slate-100">{c.titulo}</h4>
                <ul className="mt-3 space-y-2">
                  {c.items.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-400">
                      <ArrowRight className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Sec>

        {/* ── FAQ ── */}
        <Sec icon={ChevronDown} eyebrow="Preguntas frecuentes" title="Lo que solés preguntar">
          <div className="space-y-2">
            {FAQS.map((f, i) => (
              <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/50">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left"
                  aria-expanded={faqOpen === i}
                >
                  <span className="font-medium text-sm sm:text-base text-slate-100">{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                      faqOpen === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {faqOpen === i && (
                  <p className="px-4 pb-4 text-sm text-slate-400 leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </Sec>

        {/* ── CTA final ── */}
        <section className="my-16 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-[#0a0f1e] p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">¿Avanzamos?</h2>
          <p className="mt-2 text-slate-400 max-w-xl mx-auto">
            Aprobá la propuesta y arrancamos la semana que viene. Si tenés
            dudas, lo conversamos sin compromiso.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center gap-3">
            <a
              href={waAprobar(opcion)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
            >
              <Check className="w-5 h-5" /> Aprobar propuesta
            </a>
            <a
              href={waConsulta()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800 text-slate-200 font-medium px-7 py-3.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> Hablar por WhatsApp
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-teal-500/15 grid place-items-center border border-teal-500/20">
              <HeartPulse className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <span className="font-semibold text-slate-300">VanzaCode</span>
          </div>
          <p className="text-slate-500">Desarrollo web · Soluciones digitales para profesionales</p>
          <p className="mt-1">hola@vanzacode.com.ar</p>
          <p className="mt-3 text-xs">
            Propuesta válida por {VALIDEZ_DIAS} días · {FECHA}
          </p>
          <button
            onClick={() => window.print()}
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-200 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Imprimir / Guardar PDF
          </button>
        </footer>
      </main>
    </div>
  );
}

// ── Sub-components ──────────────────────────────

function Sec({ icon: Icon, eyebrow, title, children }: {
  icon: LucideIcon; eyebrow: string; title: string; children: React.ReactNode;
}) {
  return (
    <section className="py-10 border-t border-slate-800">
      <div className="flex items-center gap-2 text-teal-400 text-sm font-medium">
        <Icon className="w-4 h-4" /> {eyebrow}
      </div>
      <h2 className="mt-2 mb-6 text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">{title}</h2>
      {children}
    </section>
  );
}

function OptionCard({ op, selected, onClick, titulo, desc, precio, badge }: {
  op: number; selected: boolean; onClick: () => void;
  titulo: string; desc: string; precio: string; badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl border p-5 transition-all relative overflow-hidden ${
        selected
          ? "border-teal-500/60 bg-teal-500/10 ring-1 ring-teal-500/20"
          : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
      }`}
    >
      {badge && (
        <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide bg-teal-600 text-white px-2 py-0.5 rounded-full">
          <Star className="w-3 h-3 fill-current" /> {badge}
        </span>
      )}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Opción {op}</span>
        {selected && (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold text-teal-400 ${badge ? "mr-20" : ""}`}>
            <CheckCircle2 className="w-3.5 h-3.5" /> Seleccionada
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-slate-100">{titulo}</h3>
      <p className="mt-1.5 text-sm text-slate-400">{desc}</p>
      <div className="mt-4 text-2xl font-bold text-slate-100">{precio}</div>
      <div className="text-xs text-slate-500 mt-0.5">precio cerrado · llave en mano</div>
    </button>
  );
}

function ModuloCard({ m, extra }: {
  m: { icon: LucideIcon; titulo: string; desc: string; features: string[] };
  extra?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const Icon = m.icon;
  return (
    <div className={`rounded-xl border p-5 transition-colors ${
      extra
        ? "border-teal-500/30 bg-teal-500/5"
        : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
    }`}>
      {extra && (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-teal-400 mb-2">
          <Sparkles className="w-3 h-3" /> Solo en Opción 2
        </span>
      )}
      <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 grid place-items-center">
        <Icon className="w-5 h-5 text-teal-400" />
      </div>
      <h3 className="mt-3 font-semibold text-slate-100">{m.titulo}</h3>
      <p className="mt-1 text-sm text-slate-400">{m.desc}</p>
      {open && (
        <ul className="mt-3 space-y-1.5 border-t border-slate-800 pt-3">
          {m.features.map((f) => (
            <li key={f} className="flex gap-2 text-sm text-slate-400">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-400 hover:underline"
      >
        {open ? "Ver menos" : "Ver detalle"}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
