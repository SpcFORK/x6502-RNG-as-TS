function eobj<C extends Record<any, any> & unknown>(obj: C, names: string[] = []) {
  if (!obj) throw new Error(`No object provided to eobj.`);

  if (obj?.name) names.push(obj.name);

  names.push('default');

  let eo: Record<any, C> = {}
  for (const name of names) {
    eo[name] = obj;
    try { (window as any)[name] = obj } catch { }
  }

  // I hate TS and builders having the need to warn
  // 'OOPS! YOU CANT USE BOTH EXPORT PARADIGMS, WAHHH!'
  try { (globalThis.eval)('module').exports = eo } catch { }

  return eo
}

// Bootstarp !
export default eobj(eobj, ['eobj']).default;