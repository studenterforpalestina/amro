<script lang="ts">
	export let member: any;
</script>

<li class="grid grid-cols-6 items-center p-2 text-center">
	<span>{member.name}</span>
	<span>{member.email}</span>
	<span>{member.phoneNumber}</span>
	<span>{member.graduationYear}</span>
	<span>{member.birthYear}</span>

	<div class="grid grid-cols-2 grid-rows-2 gap-2">
		<div>Edit</div>
		<div>svg 1</div>
		<div>Delete</div>
		<div>svg 2</div>
	</div>
</li>
