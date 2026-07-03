import { Pane } from 'tweakpane'
import { PRESETS } from './presets.js'

export function createUI(PARAMS, reset, loadPreset) {
    const pane = new Pane({ title: 'Controls'})
    pane.addBinding(PARAMS, 'pause')
    pane.addBinding(PARAMS, 'speed', {min: 0, max: 10, step: 0.1})
    pane.addButton({ title: 'Reset' }).on('click', reset)
    const options = {}
    for (const name of Object.keys(PRESETS)) options[name] = name
    pane.addBinding(PARAMS, 'presets', 
        { options }).on('change', (ev) => loadPreset(ev.value))
    return pane
}
