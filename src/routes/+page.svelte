<script>
    import { _ } from "svelte-i18n";
    import BecomeAMember from "$lib/components/become-a-member.svelte";
    import Section from "$lib/components/section.svelte";
</script>

<Section class="flex flex-col items-start">
  <div class="flex flex-col items-start">
    <h1 class="text-8xl font-bold">{$_('components.homepage.join')}</h1>
    <div class="flex gap-16 flex-col xl:flex-row">
      <div class="flex flex-col gap-8">
        <h1 class="text-8xl font-bold md:text-nowrap">{$_('components.homepage.for_palestina')}</h1>
        <BecomeAMember size="large" class="ml-4" />
      </div>
      <div class="w-full self-end mt-8">
        <img src="/images/demo.png" alt="Demonstrasjon på Trondheims Torg" class="w-full h-auto grow-0 basis-7/12">
      </div>
    </div>
  </div>
</Section>
<Section red class="flex flex-col md:flex-row justify-between items-center gap-4 ">
  <h2 class="text-5xl font-bold text-center">{$_('components.navbar.events')}</h2>
  
    <button class="px-8 py-2 text-(--color-red) rounded-lg bg-(--color-text-light)
        hover:bg-red-800 active:bg-red-900 text-nowrap
          transition-colors duration-200 font-bold">{$_('components.homepage.see_events')}</button>

</Section>
<Section class="flex flex-row gap-12">
  <div class="flex flex-col gap-6 grow-0 lg:basis-5/12">
    <h2 class="text-5xl font-bold max-w-xl">{$_('components.homepage.about_us')}</h2>
    <p>Studenter for Palestina er en studentorganisasjon dedikert til å øke bevisstheten om det palestinske folkets kamp for frihet, rettferdighet ogselvbestemmelse.</p>
    <p>Vi består av studenter fra ulike studieretninger og bakgrunner som er forent i vår solidaritet med Palestina. Vi arrangerer foredrag, filmvisniger og andre arrangementer for å spre informasjon.</p>
  </div>
  <img src="/images/søtnosene.png" alt="Søtnoser" class="hidden w-full lg:block grow-0 basis-7/12">
</Section>
<img src="/images/søtnosene.png" alt="Søtnoser" class="block w-full lg:hidden">


