
window.EduVoltSimulation = {
  solve(nodes, wires, voltage=230) {
    const source = nodes.find(n => n.name === "AC Source");
    const loads = nodes.filter(n => ["Lamp","Motor","Resistor"].includes(n.name));
    const sw = nodes.find(n => n.name === "Switch");
    if (!source) return {valid:false, running:false, voltage:0,current:0,resistance:0,power:0,score:0,fault:"No AC source"};
    if (!loads.length) return {valid:false, running:false, voltage, current:0,resistance:0,power:0,score:0,fault:"No load"};
    if (sw && sw.closed === false) return {valid:true,running:false,voltage,current:0,resistance:0,power:0,score:55,fault:"Switch open"};
    const allConnected = loads.every(l => wires.some(w => w[0]===l.id || w[1]===l.id));
    if (!allConnected) return {valid:false,running:false,voltage,current:0,resistance:0,power:0,score:35,fault:"Unconnected load"};
    const resistance = loads.reduce((sum,l)=>sum+(l.name==="Lamp"?100:l.name==="Motor"?80:120),0);
    const current = voltage/resistance;
    return {valid:true,running:true,voltage,current,resistance,power:voltage*current,score:100,fault:null};
  }
};
