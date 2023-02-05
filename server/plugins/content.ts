export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (file) => {
    if (file._id.startsWith('content:episodes:') && file._id.endsWith('.md')) {
      file._searchable = [
        file.title,
        file.description,
        (file.tags ?? []).join(', '),
        file.actors.map((a: any) => a.name || '').join(', '),
        file.writers.map((a: any) => a.name || '').join(', '),
      ].join('\n\n');
    }
  });
});
