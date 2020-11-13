export default function isObjKey<T>(obj: T, key: any): key is keyof T {
  return key in obj;
}
