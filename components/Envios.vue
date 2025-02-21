<template>
  <div class="main">
    <EnviosKnob />
  </div>
  <div class="enviosTemporal p-2">
    <EnviosTemporal />
  </div>
  <hr />
  <div class="bestSend flex flex-col p-2 mt-2">
    <p class="text-lg font-semibold text-black h-2 w-min">Melhores Envios</p>
    <EnviosTop />
  </div>
  <div class="Spam"></div>
  <div class="EnviosFunnel mt-2">
    <p class="text-lg font-semibold text-black h-2 mb-8">
      Funil de Performance
    </p>
    <div class="contentfunnel flex justify-center gap-8">
      <div class="funnelsvg">
        <img
          src="file:///C:/Users/nicolas.pedroso/Desktop/dinamize-funnel-semfont.svg"
        />
      </div>
      <div class="funnelText mt-16 w-1/3">
        <Accordion>
          <AccordionPanel value="0">
            <AccordionHeader class="!border-l-4 !border-blue-500">
              <span class="flex items-center gap-2 w-full">
                <Avatar class="pi pi pi-send !text-blue-500" shape="circle" />
                <span class="font-bold whitespace-nowrap"
                  >Enviados&nbsp; &nbsp;</span
                ><span class="font-bold text-lg whitespace-nowrap"
                  >33.032
                </span>
              </span>
            </AccordionHeader>
            <AccordionContent>
              <p class="mt-2">
                Total de mensagens ou e-mails disparados para os destinatários.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="1">
            <AccordionHeader class="!border-l-4 !border-cyan-500">
              <span class="flex items-center gap-2 w-full">
                <Avatar
                  class="pi pi pi-envelope !text-cyan-500"
                  shape="circle"
                />
                <span class="font-bold whitespace-nowrap"
                  >Entregues&nbsp; &nbsp;</span
                ><span class="font-bold text-lg whitespace-nowrap"
                  >43.258
                </span>
              </span>
            </AccordionHeader>
            <AccordionContent>
              <p class="mt-2">
                Mensagens que chegaram com sucesso na caixa de e-mails do
                usuário.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="2">
            <AccordionHeader class="!border-l-4 !border-purple-500">
              <span class="flex items-center gap-2 w-full">
                <Avatar class="pi pi pi-eye !text-purple-500" shape="circle" />
                <span class="font-bold whitespace-nowrap"
                  >Visualizados&nbsp;</span
                ><span class="font-bold text-lg whitespace-nowrap"
                  >25.032
                </span>
              </span>
            </AccordionHeader>
            <AccordionContent>
              <p class="mt-2">
                Quantidade de mensagens que foram abertas pelo destinatário.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="3">
            <AccordionHeader class="!border-l-4 !border-yellow-500">
              <span class="flex items-center gap-2 w-full">
                <Avatar class="pi pi pi-link !text-yellow-500" shape="circle" />
                <span class="font-bold whitespace-nowrap"
                  >Clicados&nbsp; &nbsp;</span
                ><span class="font-bold text-lg whitespace-nowrap"
                  >10.112
                </span>
              </span>
            </AccordionHeader>
            <AccordionContent>
              <p class="mt-2">
                Número de usuários que clicaram em um link dentro da mensagem.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="4">
            <AccordionHeader class="!border-l-4 !border-emerald-500">
              <span class="flex items-center gap-2 w-full">
                <Avatar
                  class="pi pi pi-dollar !text-emerald-500"
                  shape="circle"
                />
                <span class="font-bold whitespace-nowrap"
                  >Receita&nbsp; &nbsp;</span
                ><span class="font-bold text-lg whitespace-nowrap">5.200 </span>
              </span>
            </AccordionHeader>
            <AccordionContent>
              <p class="mt-2">
                Valor gerado a partir das interações dos usuários com a
                campanha.
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style></style>
