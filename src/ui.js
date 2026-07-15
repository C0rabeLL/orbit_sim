import { Pane } from 'tweakpane'
import { PRESETS } from './presets.js'

export function createUI(PARAMS, reset, loadPreset) {
    const pane = new Pane()
    const controlF = pane.addFolder({title: 'Controls'})
    controlF.addBinding(PARAMS, 'pause')
    controlF.addBinding(PARAMS, 'trails')
    controlF.addBinding(PARAMS, 'speed', {min: 0, max: 10, step: 0.1})
    controlF.addButton({ title: 'Reset' }).on('click', reset)
    const options = {}
    for (const name of Object.keys(PRESETS)) options[name] = name
    controlF.addBinding(PARAMS, 'presets', 
        { options }).on('change', (ev) => loadPreset(ev.value))

    const bodyF = pane.addFolder({ title: 'Selected body'})
    return { pane, controlF, bodyF }
}

export function updateUI(body, folder, deleteBody) {
    folder.children.slice().forEach(c => c.dispose())
    folder.addBinding(body, "mass")
    folder.addBinding(body, "position", { step: 0.01 })
    folder.addBinding(body, "velocity", { step: 0.01 })
    folder.addBinding(body, "acceleration", { step: 0.01 })
    folder.addButton({ title: 'Delete body' }).on('click', deleteBody)
    return folder
}