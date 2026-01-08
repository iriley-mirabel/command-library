import { getAllCommands } from '@/lib/commands';
import LibraryClient from './LibraryClient';

export const dynamic = 'force-static';

export default async function LibraryPage() {
  const commands = await getAllCommands();
  
  return <LibraryClient commands={commands} />;
}

