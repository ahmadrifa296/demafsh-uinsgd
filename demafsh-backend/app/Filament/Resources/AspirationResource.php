<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AspirationResource\Pages;
use App\Models\Aspiration;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class AspirationResource extends Resource
{
    protected static ?string $model = Aspiration::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationGroup = 'Layanan Mahasiswa';

    protected static ?string $navigationLabel = 'Ruang Aspirasi';

    protected static ?string $modelLabel = 'Aspirasi';

    protected static ?string $pluralModelLabel = 'Ruang Aspirasi';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Detail Aspirasi Mahasiswa')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('ticket_code')
                            ->label('Kode Tiket')
                            ->default(fn (): string => 'ASP-' . Str::upper(Str::random(6)))
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(20)
                            ->disabledOn('edit')
                            ->dehydrated(),
                        Forms\Components\TextInput::make('topic')
                            ->label('Topik Aspirasi')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('sender_name')
                            ->label('Nama Pengirim')
                            ->placeholder('Anonim jika kosong')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('nim')
                            ->label('NIM')
                            ->maxLength(50),
                        Forms\Components\TextInput::make('major')
                            ->label('Program Studi / Jurusan')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('message')
                            ->label('Isi Aspirasi / Pengaduan')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Tindak Lanjut & Tanggapan Resmi DEMA')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->label('Status Penanganan')
                            ->options([
                                'diterima' => 'Diterima',
                                'dikaji' => 'Dikaji',
                                'ditindaklanjuti' => 'Ditindaklanjuti',
                                'selesai' => 'Selesai',
                            ])
                            ->default('diterima')
                            ->required(),
                        Forms\Components\Textarea::make('admin_response')
                            ->label('Tanggapan Resmi DEMA')
                            ->rows(4)
                            ->placeholder('Tuliskan tanggapan atau progres tindak lanjut untuk dilihat mahasiswa melalui pelacakan tiket.'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('ticket_code')
                    ->label('Kode Tiket')
                    ->badge()
                    ->color('amber')
                    ->copyable()
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('sender_name')
                    ->label('Pengirim')
                    ->placeholder('Anonim')
                    ->searchable(),
                Tables\Columns\TextColumn::make('major')
                    ->label('Jurusan')
                    ->searchable()
                    ->limit(25),
                Tables\Columns\TextColumn::make('topic')
                    ->label('Topik')
                    ->searchable()
                    ->limit(40)
                    ->wrap(),
                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'diterima' => 'Diterima',
                        'dikaji' => 'Dikaji',
                        'ditindaklanjuti' => 'Ditindaklanjuti',
                        'selesai' => 'Selesai',
                        default => $state,
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'diterima' => 'gray',
                        'dikaji' => 'warning',
                        'ditindaklanjuti' => 'info',
                        'selesai' => 'success',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('admin_response')
                    ->label('Tanggapan Resmi DEMA')
                    ->placeholder('Belum ditanggapi')
                    ->limit(50)
                    ->wrap(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Masuk Pada')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'diterima' => 'Diterima',
                        'dikaji' => 'Dikaji',
                        'ditindaklanjuti' => 'Ditindaklanjuti',
                        'selesai' => 'Selesai',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAspirations::route('/'),
            'create' => Pages\CreateAspiration::route('/create'),
            'edit' => Pages\EditAspiration::route('/{record}/edit'),
        ];
    }
}
