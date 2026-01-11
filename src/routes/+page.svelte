<script>
    import BecomeAMember from "$lib/components/become-a-member.svelte";
    import Section from "$lib/components/section.svelte";
</script>

<Section fullHeight class="flex flex-col">
  <div class="flex flex-col items-start">
    <h1 class="">Bli med i Studenter</h1>
    <div class="flex gap-16 flex-col xl:flex-row">
      <div class="flex flex-col gap-8">
        <h1 class="md:text-nowrap">for Palestina</h1>
        <BecomeAMember size="large" class="ml-4" />
      </div>
      <div class="w-full self-end mt-8">
        <img src="/images/demo.png" alt="Demonstrasjon på Trondheims Torg" class="w-full h-auto grow-0 basis-7/12">
      </div>

    </div>
  </div>
</Section>
<Section red class="flex flex-col lg:flex-row justify-between items-center gap-4">
  <h2>Meld deg på nyhetsbrevet</h2>
  <form class="flex gap-2 flex-col items-center max-w-[450px] text-center lg:text-left lg:mt-6">
    <input type="email" id="email" name="email" placeholder="E-postadresse" required autocomplete="home email" class="border-b text-center max-w-64 transition-all mb-[2.5px] outline-0 placeholder:opacity-100 border-b-(--color-text-light) focus:border-b-4 focus:mb-0"/>
    <label for="consent" class="flex gap-4 items-center">
      <input type="checkbox" id="consent" name="consent" required />
      <p>
        Jeg godkjenner at studenter for Palestina kan sende meg mail om arrangementer, kampanjer, osv.
      </p>
    </label>
    <button type="submit" class="px-8 py-2 text-(--color-red) rounded-lg bg-(--color-text-light)
        hover:bg-red-800 active:bg-red-900 text-nowrap
          transition-colors duration-200 font-bold">Send inn</button>
  </form>
</Section>
<Section class="flex flex-row gap-12">
  <div class="flex flex-col gap-6 grow-0 lg:basis-5/12">
    <h2>Om oss</h2>
    <p>Studenter for Palestina er en studentorganisasjon dedikert til å øke bevisstheten om det palestinske folkets kamp for frihet, rettferdighet ogselvbestemmelse.</p>
    <p>Vi består av studenter fra ulike studieretninger og bakgrunner som er forent i vår solidaritet med Palestina. Vi arrangerer foredrag, filmvisniger og andre arrangementer for å spre informasjon.</p>
  </div>
  <img src="/images/søtnosene.png" alt="Søtnoser" class="hidden w-full lg:block grow-0 basis-7/12">
</Section>
<img src="/images/søtnosene.png" alt="Søtnoser" class="block w-full lg:hidden">


