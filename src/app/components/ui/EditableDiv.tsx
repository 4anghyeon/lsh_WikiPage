import React from 'react';
import { cn } from '@/app/lib/utils';

export interface EditableDivProps extends React.TextareaHTMLAttributes<HTMLDivElement> {}

const EditableDiv = React.forwardRef<HTMLDivElement, EditableDivProps>(
  ({ className, ...props }: EditableDivProps, ref) => {
    return (
      <div
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-text',
          className,
        )}
        {...props}
        ref={ref}
        contentEditable={true}
        data-ph={props.placeholder}
      >
        {props.children}
      </div>
    );
  },
);

EditableDiv.displayName = 'EditableDiv';

export default EditableDiv;
