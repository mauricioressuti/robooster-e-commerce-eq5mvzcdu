import { MapPin, Phone, Mail, MessageSquare, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function Contact() {
  return (
    <div className="flex flex-col w-full min-h-screen py-12 bg-muted/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Fale com a Robooster
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Nossa equipe de engenheiros e consultores técnicos está pronta para ajudar você a
            escolher o equipamento certo para o seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-6 border-b pb-4">Canais de Atendimento</h3>
              <div className="space-y-6">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 hover:bg-muted/50 p-2 -mx-2 rounded transition-colors"
                >
                  <div className="bg-[#25D366]/20 text-[#25D366] p-3 rounded-full shrink-0">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">WhatsApp Técnico</h4>
                    <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
                    <span className="text-xs font-bold text-[#25D366]">Resposta em até 10 min</span>
                  </div>
                </a>
                <div className="flex items-start gap-4 p-2 -mx-2">
                  <div className="bg-primary/10 text-primary p-3 rounded-full shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Televendas</h4>
                    <p className="text-sm text-muted-foreground">(11) 4000-0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-2 -mx-2">
                  <div className="bg-primary/10 text-primary p-3 rounded-full shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">E-mail Comercial</h4>
                    <p className="text-sm text-muted-foreground">orcamento@robooster.com.br</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex items-start gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <div className="text-sm leading-relaxed">
                  <strong className="text-foreground block mb-1 text-base">
                    Horário de Funcionamento
                  </strong>
                  Segunda a Sexta: 08:00 às 18:00
                  <br />
                  Sábado: Plantão Técnico via WhatsApp
                </div>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground pt-4 border-t">
                <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <div className="text-sm leading-relaxed">
                  <strong className="text-foreground block mb-1 text-base">
                    Showroom e Fábrica
                  </strong>
                  Polo Industrial, São Paulo - SP
                  <br />
                  Agende sua visita para teste prático.
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-card border rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Solicite um Orçamento ou Visita</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-semibold">
                      Nome Completo
                    </Label>
                    <Input id="name" placeholder="João da Silva" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="font-semibold">
                      Empresa / CNPJ
                    </Label>
                    <Input id="company" placeholder="Sua Empresa Ltda" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-semibold">
                      E-mail Corporativo
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="joao@empresa.com.br"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-semibold">
                      WhatsApp
                    </Label>
                    <Input id="phone" placeholder="(11) 99999-9999" className="h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interest" className="font-semibold">
                    Equipamento de Interesse
                  </Label>
                  <select
                    id="interest"
                    className="flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Selecione...</option>
                    <option value="cnc">CNC Router</option>
                    <option value="edgebander">Coladeira de Bordas</option>
                    <option value="saw">Serra Esquadrejadeira</option>
                    <option value="other">Outros / Dúvida Técnica</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-semibold">
                    Como podemos ajudar?
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Descreva sua necessidade de produção, gargalos atuais ou dúvidas sobre o financiamento..."
                    className="min-h-[150px] resize-y"
                  />
                </div>
                <Button className="w-full bg-primary text-white hover:bg-primary/90 h-14 text-lg font-bold">
                  Enviar Mensagem para Consultor
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Ao enviar, você concorda com nossa Política de Privacidade. Seus dados estão
                  seguros e não enviamos spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
