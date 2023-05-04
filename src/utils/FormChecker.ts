import Validator, {MASKS} from "./Validator";

export default function FormChecker(e: Event): void {
  const validator = new Validator();
  let checked = true;
  e.preventDefault();
  Object.values((e.currentTarget as HTMLElement)
    .querySelectorAll("input[data-mask]"))
    .forEach(element => {
    const htmlElement = <HTMLElement>element;
    const current = validator.is((<HTMLInputElement>htmlElement)?.value || '',
      htmlElement.dataset?.mask || MASKS.NOT_EMPTY);
    if (!current) htmlElement.setAttribute('invalid','true');
    checked = checked && current;
  });
  if (checked) {
    console.log(Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement)));
  }
}
