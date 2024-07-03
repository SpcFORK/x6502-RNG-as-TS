import { defineConfig } from 'tsup'

const head = `
/**
--- SpcFORK ---
••¡¡¡¡••••ïï++••¡¡¡¡••••ïï++••¦¦¬¬||||¡¡¡¡¯¯¯¯ªª÷÷¯¯\\\\||{{••••••ïï••††\\\\¬¬¦¦¦¦}}
ïï++••¡¡¬¬{{••ïï++••¡¡¬¬{{••ïï++¡¡((¡¡¡¡¯¯¯¯ªªªª))))÷÷¯¯\\\\||||||{{ïï••††\\\\¬¬¦¦¦¦
{{••ïï++¬¬||||{{••ïï++¬¬||||{{••ïï¬¬¡¡¯¯¯¯ªªªª))))••ii))÷÷¯¯¯¯¯¯\\\\{{ïï••††\\\\¬¬¦¦
\\\\||{{••ïï((¡¡\\\\||{{••ïï((¡¡\\\\||{{••((¬¬ªªªª))))••••¬¬¬¬ii))))))÷÷\\\\{{ïï••††\\\\¬¬
¯¯¯¯\\\\||{{¬¬¡¡¯¯¯¯\\\\||{{¬¬¡¡¯¯¯¯\\\\||¬¬¡¡ªª))))••••¬¬¬¬¡¡\\\\¬¬¬¬¬¬ii÷÷\\\\{{ïï••††\\\\
¬¬ªª÷÷¯¯\\\\||((¬¬ªª÷÷¯¯\\\\||((¬¬ªª÷÷¯¯\\\\||¬¬””••••¬¬¬¬¡¡¡¡¦¦¦¦¦¦¦¦\\\\ii÷÷\\\\{{ïï••††
¡¡ªª))))÷÷¯¯\\\\¡¡ªª))))÷÷¯¯\\\\¡¡ªª))))÷÷¯¯¡¡ªª••¬¬¬¬¡¡¡¡¦¦¦¦cccc^^÷÷\\\\ii÷÷\\\\{{ïï••
||¬¬””••ii))÷÷¯¯¯¯””••ii))÷÷¯¯¯¯””••ii))÷÷¯¯””{{¡¡¡¡¦¦¦¦ccccÙÙcc^^÷÷\\\\ii÷÷\\\\{{ïï
¯¯¡¡ªª••¬¬¬¬ii))))))••¬¬¬¬ii))))))••¬¬¬¬ii))))••¡¡¦¦¦¦ccccÿÿÙÙÿÿcc^^÷÷\\\\ii÷÷\\\\{{
ªª÷÷¯¯””{{¡¡\\\\¬¬¬¬¬¬ii{{¡¡\\\\¬¬¬¬¬¬ii{{¡¡\\\\¬¬¬¬¬¬¬¬¬¬ccccððððÙÙññÙÙcc^^¦¦¬¬))¯¯||
ªª))))ªª••¡¡¦¦¦¦¦¦¦¦\\\\••¡¡¦¦¦¦¦¦¦¦\\\\¬¬¡¡¦¦¦¦¦¦¦¦¦¦¦¦¾¾ððððÙÙððÙÙññÙÙcc¦¦¬¬))¯¯||
))))••ii)){{¬¬cccc^^¦¦\\\\¬¬¬¬cccc^^¦¦¦¦¦¦¦¦cccc^^¦¦cccccccccccccccccccc¦¦¬¬))¯¯||
””••••¬¬¬¬••¡¡¾¾ððcc÷÷¦¦¦¦¦¦¾¾ððcc¦¦¬¬cccc¾¾ððcc÷÷¾¾ððððððððððððððððcc¦¦¬¬))¯¯||
ªª••¬¬¬¬¡¡\\\\¡¡¾¾ððccccccccccccððcc÷÷¦¦¾¾ððccððccccccððððððððððððððððcc¦¦¬¬))¯¯||
¬¬””{{¡¡¡¡¦¦¦¦¾¾ððððccððððccððððccccccccccccccccððððððððcc¾¾¾¾¾¾¾¾¾¾cc¦¦¬¬))¯¯||
¡¡ªª••¡¡¦¦¦¦ccccccððððððððððððcccc¾¾ððððððccððccððððððððcc¦¦¡¡¡¡¡¡¡¡¬¬¦¦\\\\ii÷÷\\\\
((¬¬””{{¬¬ccccððððððððððððððððððððccccccccccððccððððcc¾¾cc¦¦¬¬••••••{{¡¡¡¡¬¬))¯¯
¬¬¡¡ªª••¡¡¾¾ððcc¾¾ððccððððccððcc¾¾ððccððððccððccððððcccc^^¦¦\\\\¬¬¬¬ii””••{{¬¬ii÷÷
¡¡((¬¬””{{¬¬¾¾cc¦¦¾¾cccccccccccc^^ccccccððccððccððððððððcc÷÷¦¦¦¦¦¦\\\\iiªª””••••))
}}¡¡((¬¬””{{¡¡¬¬¦¦ccccððððcc¾¾ððccccððððccccððccððððððððcccccccc^^¦¦\\\\ii÷÷ªª””))
ïï}}¡¡((¬¬””••{{¬¬¾¾ððððððððccccððððccccððccððcc¾¾¾¾ððððððððððððcc÷÷¦¦\\\\ii÷÷¬¬ªª
//ïï}}¡¡((¬¬””••¡¡¾¾ððððððððccððccccððððccccððcc¦¦¾¾ððððððððððððcccc^^¦¦¬¬))¯¯¡¡
||++««¦¦¬¬¡¡ªª••¡¡ccccððððccccccððððccccððððcccc¦¦¬¬¾¾¾¾¾¾¾¾ððððððððcc¦¦¬¬))¯¯||
||++««¦¦¬¬¡¡ªª••¡¡¾¾ððððððððccððcc¾¾ððððcc¾¾cc¦¦÷÷¦¦¦¦¦¦¦¦¾¾ððððððððcc¦¦¬¬))¯¯||
¡¡//ïï}}¡¡((¬¬””{{¬¬¾¾¾¾cccccccccccc¾¾¾¾cc÷÷¦¦÷÷¦¦cccc^^cccc¾¾¾¾ððððcc¦¦¬¬))¯¯||
««¡¡//ïï}}¡¡((¬¬””{{¡¡¬¬¾¾ððccððccððcc÷÷¦¦cccccc^^¾¾ððcc¾¾ððcc¾¾ððððcc¦¦¬¬))¯¯||
ii««¡¡//ïï}}¡¡((¬¬””{{¡¡¾¾ððccððccððcccc^^¾¾ððððcccc¾¾cccc¾¾cc¾¾ððððcc¦¦¬¬))¯¯||
))¡¡÷÷||++««¦¦¬¬¡¡ªª••¡¡¾¾ððccððððððððððcc¾¾ððððccððccccððccccccððððcc¦¦¬¬))¯¯||
))¡¡÷÷||++««¦¦¬¬¡¡ªª••¡¡¾¾ððccððcccccccccc¾¾ððððcc¾¾ððððccccððððððððcc¦¦¬¬))¯¯||
))¡¡÷÷||++««¦¦¬¬¡¡ªª••¡¡¾¾ððccððððððððððcc¾¾ððððccccccccccccððððððððcc¦¦¬¬))¯¯||
))¡¡÷÷||++««¦¦¬¬¡¡ªª••¡¡¾¾ððcccccccccccccc¦¦¾¾¾¾ððððððððððððððððcc¾¾cc¦¦¬¬))¯¯||
))¡¡÷÷||++««¦¦¬¬¡¡ªª••¡¡¾¾ððððððððððððððcc¦¦¬¬¾¾ððððððððððððððððcc¦¦¬¬¦¦\\\\ii÷÷\\\\
ïïii««¡¡//ïï}}¡¡((¬¬””{{¬¬¾¾¾¾¾¾¾¾¾¾¾¾¾¾cc¦¦¬¬¬¬¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾cc¦¦¬¬¡¡¡¡¬¬))¯¯
——ïïii««¡¡//ïï}}¡¡((¬¬””{{¡¡¡¡¡¡¡¡¡¡¡¡¡¡¬¬¦¦\\\\{{¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¬¬¦¦\\\\••{{¬¬ii÷÷
————ïïii««¡¡//ïï}}¡¡((¬¬””••••••••••••••{{¡¡¡¡¬¬••••••••••••••••{{¡¡¡¡¬¬))••••))
——————ïïii««¡¡//ïï}}¡¡((¬¬ªªªªªªªªªªªªªª””••{{¬¬iiªªªªªªªªªªªªªª””••{{¬¬iiªª””))
————————ïïii««¡¡//ïï}}¡¡((¡¡¡¡¡¡¡¡¡¡¡¡¡¡¬¬ªª””••••))¯¯¡¡¡¡¡¡¡¡¡¡¬¬ªª””••••))¯¯ªª
——————————ïïii««¡¡//ïï}}¡¡¬¬¬¬¬¬¬¬¬¬¬¬¬¬((¡¡¬¬ªª””))÷÷\\\\¬¬¬¬¬¬¬¬((¡¡¬¬ªª””))÷÷¡¡
————————————ïïii««¡¡//ïï}}¦¦¦¦¦¦¦¦¦¦¦¦¦¦¡¡¬¬((¡¡¬¬ªªªª¯¯||••++¦¦¡¡¬¬((¡¡¬¬ªªªª¯¯
——————————————ïïii««¡¡//ïï««««««««««««««}}¦¦¡¡¬¬((¡¡¬¬¯¯\\\\{{ïï••}}¦¦¡¡¬¬((¡¡¬¬¯¯
*/
`

export default defineConfig({
  entry: ['src/'],
  splitting: false,
  clean: true,
  platform: 'neutral',
  outDir: 'dist',
  dts: true,
  bundle: true,
  sourcemap: true,
  minify: true,
  format: ['cjs', 'esm', 'iife'],
  banner: {
    js: head
  }
})
