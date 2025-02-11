<template>
  <div class="main">
    <EnviosKnob />
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
    <div class="contentfunnel flex gap-4">
      <div class="funnelsvg">
        <img
          src="file:///C:/Users/nicolas.pedroso/Desktop/dinamize-funnel-semfont.svg"
        />
      </div>
      <div class="funnelText mt-6 w-1/2">
        <Accordion value="0">
          <AccordionPanel value="0">
            <AccordionHeader>
              <span class="flex items-center gap-2 w-full">
                <Avatar class="pi pi pi-send !text-blue-500" shape="circle" />
                <span class="font-bold whitespace-nowrap"
                  >Enviados - 33.032</span
                ></span
              >
            </AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="1">
            <AccordionHeader>
              <span class="flex items-center gap-2 w-full">
                <Avatar
                  class="pi pi pi-envelope !text-cyan-500"
                  shape="circle"
                />
                <span class="font-bold whitespace-nowrap"
                  >Entregues - 43.258</span
                ></span
              >
            </AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="2">
            <AccordionHeader>
              <span class="flex items-center gap-2 w-full">
                <Avatar class="pi pi pi-eye !text-purple-500" shape="circle" />
                <span class="font-bold whitespace-nowrap"
                  >Visualizados - 25.000</span
                ></span
              >
            </AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="3">
            <AccordionHeader>
              <span class="flex items-center gap-2 w-full">
                <Avatar class="pi pi pi-link !text-yellow-500" shape="circle" />
                <span class="font-bold whitespace-nowrap"
                  >Clicados - 10.000</span
                ></span
              >
            </AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="4">
            <AccordionHeader>
              <span class="flex items-center gap-2 w-full">
                <Avatar
                  class="pi pi pi-dollar !text-emerald-500"
                  shape="circle"
                />
                <span class="font-bold whitespace-nowrap"
                  >Receita - 5.200</span
                ></span
              >
            </AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
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
