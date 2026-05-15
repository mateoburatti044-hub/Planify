import { TaskAttachment } from '../types';

// Función simple para generar ID único
const generateId = () => {
  return 'att-' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

const ALLOWED_EXTENSIONS = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  video: ['mp4', 'webm', 'mov', 'avi', 'mkv'],
  document: ['pdf', 'doc', 'docx', 'xlsx', 'txt']
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

class AttachmentService {
  /**
   * Validar archivo
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `El archivo es demasiado grande. Máximo permitido: 50MB`
      };
    }

    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const isValid = Object.values(ALLOWED_EXTENSIONS)
      .flat()
      .includes(extension);

    if (!isValid) {
      return {
        valid: false,
        error: `Tipo de archivo no permitido. Extensiones válidas: ${Object.values(ALLOWED_EXTENSIONS).flat().join(', ')}`
      };
    }

    return { valid: true };
  }

  /**
   * Detectar tipo de archivo
   */
  getFileType(file: File): 'image' | 'video' | 'document' {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    
    if (ALLOWED_EXTENSIONS.image.includes(extension)) return 'image';
    if (ALLOWED_EXTENSIONS.video.includes(extension)) return 'video';
    if (ALLOWED_EXTENSIONS.document.includes(extension)) return 'document';
    
    return 'document';
  }

  /**
   * Convertir archivo a base64
   */
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Crear attachment desde archivo
   */
  async createAttachment(file: File, taskId: string, userId: string, description?: string): Promise<TaskAttachment | null> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      console.error(validation.error);
      return null;
    }

    try {
      const fileData = await this.fileToBase64(file);
      const attachment: TaskAttachment = {
        id: generateId(),
        taskId,
        fileName: file.name,
        fileType: this.getFileType(file),
        fileSize: file.size,
        fileData,
        mimeType: file.type,
        uploadedBy: userId,
        uploadedAt: new Date().toISOString(),
        description
      };

      return attachment;
    } catch (error) {
      console.error('✗ Error al crear attachment:', error);
      return null;
    }
  }

  /**
   * Descargar attachment
   */
  downloadAttachment(attachment: TaskAttachment): void {
    const link = document.createElement('a');
    link.href = attachment.fileData;
    link.download = attachment.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Obtener URL para vista previa
   */
  getPreviewUrl(attachment: TaskAttachment): string {
    return attachment.fileData;
  }

  /**
   * Obtener tamaño legible del archivo
   */
  getReadableSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Validar si el attachment es una imagen
   */
  isImage(attachment: TaskAttachment): boolean {
    return attachment.fileType === 'image' || attachment.mimeType.startsWith('image/');
  }

  /**
   * Validar si el attachment es un video
   */
  isVideo(attachment: TaskAttachment): boolean {
    return attachment.fileType === 'video' || attachment.mimeType.startsWith('video/');
  }
}

export const attachmentService = new AttachmentService();
