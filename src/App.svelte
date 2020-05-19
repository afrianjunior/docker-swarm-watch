<script>
	import { nodesData } from './store'
	import Node from './components/Node.svelte'

	const name = "as";
	let nodes = []
	
	nodesData.subscribe(newValue => {
		nodes = [...newValue]
	})
</script>

<main>
	<div class="node-wrapper">
		{#each nodes as node, i}
			<Node
				name={node.Description.Hostname}
				type={node.Spec.Role}
				architecture={node.Description.Platform.Architecture}
				os={node.Description.Platform.OS}
				memory={node.Description.Resources.MemoryBytes}
				addr={node.Status.Addr}
				tasks={node.Tasks}
			/>
		{/each}
	</div>
</main>