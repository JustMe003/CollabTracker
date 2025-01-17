export class JSONDate {
  public static reviveDateTime(key: any, value: any) {
    if (typeof value === 'string') {
      const isValidDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:.(\d+))?Z$/.test(value);
      if (isValidDate) {
        return new Date(value); // Only return a Date if the string is valid
      }
    }
    return value;
  }
}