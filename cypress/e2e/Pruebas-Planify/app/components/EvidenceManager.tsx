import React, { useState, useRef } from 'react';
import { TaskAttachment } from '../types';
import { attachmentService } from '../services/attachmentService';
import {
  DocumentArrowDownIcon,
  XMarkIcon,
  PhotoIcon,
  FilmIcon,
  DocumentIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface EvidenceManagerProps {
  taskId: string;
  attachments: TaskAttachment[];
  userId: string;
  onAddAttachment: (attachment: TaskAttachment) => void;
  onRemoveAttachment: (attachmentId: string) => void;
  readOnly?: boolean;
}

export const EvidenceManager: React.FC<EvidenceManagerProps> = ({
  taskId,
  attachments = [],
  userId,
  onAddAttachment,
  onRemoveAttachment,
  readOnly = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setSuccess('');
    setUploading(true);

    try {
      const attachment = await attachmentService.createAttachment(
        file,
        taskId,
        userId,
        file.name
      );

      if (attachment) {
        onAddAttachment(attachment);
        setSuccess(`Evidencia "${file.name}" agregada exitosamente`);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setError('Error al procesar el archivo');
      }
    } catch (err) {
      setError('Error al cargar el archivo');
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (attachment: TaskAttachment) => {
    if (attachmentService.isImage(attachment)) {
      return <PhotoIcon className="w-5 h-5 text-blue-400" />;
    }
    if (attachmentService.isVideo(attachment)) {
      return <FilmIcon className="w-5 h-5 text-purple-400" />;
    }
    return <DocumentIcon className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="space-y-4">
      <div className="border border-planify-border rounded-lg p-4 bg-planify-card/50">
        <h3 className="text-sm font-semibold text-planify-text-primary mb-4 flex items-center">
          <PhotoIcon className="w-5 h-5 mr-2 text-planify-accent" />
          Evidencias de QA (Imágenes y Videos)
        </h3>

        {!readOnly && (
          <div className="mb-4">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              disabled={uploading}
              className="hidden"
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full px-4 py-3 bg-planify-accent hover:bg-planify-accent-hover disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <PhotoIcon className="w-5 h-5" />
              {uploading ? 'Cargando...' : 'Agregar Evidencia'}
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5" />
            {success}
          </div>
        )}

        {attachments.length > 0 ? (
          <div className="space-y-2">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between p-3 bg-planify-panel/50 hover:bg-planify-panel border border-planify-border rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getFileIcon(attachment)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-planify-text-primary truncate">
                      {attachment.fileName}
                    </p>
                    <p className="text-xs text-planify-text-muted">
                      {attachmentService.getReadableSize(attachment.fileSize)} •{' '}
                      {new Date(attachment.uploadedAt).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-2">
                  {attachmentService.isImage(attachment) && (
                    <a
                      href={attachment.fileData}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-planify-accent/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Ver imagen"
                    >
                      <PhotoIcon className="w-4 h-4 text-blue-400" />
                    </a>
                  )}

                  {attachmentService.isVideo(attachment) && (
                    <a
                      href={attachment.fileData}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-planify-accent/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Ver video"
                    >
                      <FilmIcon className="w-4 h-4 text-purple-400" />
                    </a>
                  )}

                  <button
                    onClick={() =>
                      attachmentService.downloadAttachment(attachment)
                    }
                    className="p-2 hover:bg-planify-accent/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Descargar"
                  >
                    <DocumentArrowDownIcon className="w-4 h-4 text-green-400" />
                  </button>

                  {!readOnly && (
                    <button
                      onClick={() => onRemoveAttachment(attachment.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Eliminar"
                    >
                      <XMarkIcon className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-planify-text-muted">
            <PhotoIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay evidencias cargadas aún</p>
            <p className="text-xs mt-1">
              Carga imágenes o videos para documentar tus pruebas de QA
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvidenceManager;
