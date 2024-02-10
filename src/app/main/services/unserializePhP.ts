export function unserialize(data: string): any {
    if (!data || data.trim() === '') {
      return null;
    }
  
    try {
      const serializedRegex =
        /s:\d+:"([^"]*)";(?:s:\d+:"([^"]*)";)?(?:i:([+-]?\d+);)?/g;
  
      const serializedParts = data.matchAll(serializedRegex);
  
      const result: any = {};
  
      for (const part of serializedParts) {
        const key = part[1];
        const value = part[2] !== undefined ? part[2] : parseInt(part[3], 10);
  
        result[key] = value;
      }
  
      return result;
    } catch (error) {
      console.error('Error during unserialization:', error);
      return null;
    }
  }